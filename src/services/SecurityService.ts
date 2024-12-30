import { TwoFactorSetup, SecurityQuestion, User } from '../types';
import { supabase } from '../lib/supabase';
import QRCode from 'qrcode';

export class SecurityService {
  async setupTwoFactor(user: User): Promise<TwoFactorSetup> {
    // Generate a secure secret
    const secret = crypto.randomUUID();
    
    // Create QR code
    const otpauth = `otpauth://totp/EventHub:${user.email}?secret=${secret}&issuer=EventHub`;
    const qrCode = await QRCode.toDataURL(otpauth);
    
    // Generate backup codes
    const backupCodes = Array.from({ length: 10 }, () => 
      crypto.randomUUID().slice(0, 8).toUpperCase()
    );

    // Store the secret and backup codes in the database
    const { error } = await supabase
      .from('user_2fa')
      .upsert({
        user_id: user.id,
        secret,
        backup_codes: backupCodes,
        enabled: false
      });

    if (error) throw error;

    return {
      secret,
      qrCode,
      backupCodes
    };
  }

  async verifyTwoFactorToken(userId: string, token: string): Promise<boolean> {
    // In a real implementation, use a proper TOTP library
    // This is just a placeholder
    return token.length === 6;
  }

  validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (password.length < 12) {
      errors.push('Password must be at least 12 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async validateSecurityQuestions(userId: string, answers: SecurityQuestion[]): Promise<boolean> {
    const { data: storedQuestions, error } = await supabase
      .from('security_questions')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    if (!storedQuestions) return false;

    // Compare answers (in a real implementation, use proper password hashing)
    return answers.every(answer => 
      storedQuestions.some(q => 
        q.question === answer.question && 
        q.answer === answer.answer
      )
    );
  }

  async setSecurityQuestions(userId: string, questions: SecurityQuestion[]): Promise<void> {
    const { error } = await supabase
      .from('security_questions')
      .upsert(
        questions.map(q => ({
          user_id: userId,
          question: q.question,
          answer: q.answer
        }))
      );

    if (error) throw error;
  }
}
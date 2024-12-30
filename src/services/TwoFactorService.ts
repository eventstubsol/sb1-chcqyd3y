import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { User } from '../types';

export class TwoFactorService {
  private backupCodes: Map<string, string[]> = new Map();
  private verifiedSessions: Map<string, Date> = new Map();
  private readonly SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  async setupTwoFactor(user: User): Promise<{
    secret: string;
    qrCode: string;
    backupCodes: string[];
  }> {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(user.email, 'EventHub', secret);
    const qrCode = await QRCode.toDataURL(otpauth);
    
    // Generate backup codes
    const backupCodes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substr(2, 8).toUpperCase()
    );
    
    this.backupCodes.set(user.id, backupCodes);

    return {
      secret,
      qrCode,
      backupCodes
    };
  }

  verifyToken(secret: string, token: string): boolean {
    return authenticator.verify({ token, secret });
  }

  verifyBackupCode(userId: string, code: string): boolean {
    const codes = this.backupCodes.get(userId);
    if (!codes) return false;

    const index = codes.indexOf(code);
    if (index === -1) return false;

    // Remove used backup code
    codes.splice(index, 1);
    this.backupCodes.set(userId, codes);
    return true;
  }

  startVerifiedSession(userId: string): void {
    this.verifiedSessions.set(userId, new Date());
  }

  isSessionValid(userId: string): boolean {
    const sessionStart = this.verifiedSessions.get(userId);
    if (!sessionStart) return false;

    const now = new Date();
    const elapsed = now.getTime() - sessionStart.getTime();
    return elapsed < this.SESSION_DURATION;
  }

  clearSession(userId: string): void {
    this.verifiedSessions.delete(userId);
  }
}

export const twoFactorService = new TwoFactorService();
interface ModerationResult {
  hasProfanity: boolean;
  classification: 'appropriate' | 'inappropriate';
  needsReview: boolean;
  confidence: number;
  flags: string[];
}

export class ContentModerationService {
  private profanityList: Set<string>;
  private sensitiveTopics: Set<string>;
  private spamPatterns: RegExp[];

  constructor() {
    this.profanityList = new Set([
      'spam', 'scam', 'offensive', 'inappropriate',
      // Add more words as needed
    ]);

    this.sensitiveTopics = new Set([
      'violence', 'hate', 'discrimination', 'harassment'
    ]);

    this.spamPatterns = [
      /\b(buy|cheap|discount|free|offer|price|win|winner)\b/gi,
      /\b(click here|sign up now|limited time|act now)\b/gi,
      /\b(earn money|make money|cash bonus|prize)\b/gi
    ];
  }

  async scanContent(content: string): Promise<ModerationResult> {
    const normalizedContent = content.toLowerCase();
    const words = normalizedContent.split(/\s+/);
    
    // Check for profanity
    const profanityMatches = words.filter(word => this.profanityList.has(word));
    const hasProfanity = profanityMatches.length > 0;

    // Check for sensitive topics
    const sensitiveMatches = words.filter(word => this.sensitiveTopics.has(word));
    const hasSensitiveContent = sensitiveMatches.length > 0;

    // Check for spam patterns
    const hasSpamPatterns = this.spamPatterns.some(pattern => pattern.test(content));

    // Calculate confidence score (0-1)
    const confidenceScore = this.calculateConfidenceScore({
      profanityCount: profanityMatches.length,
      sensitiveCount: sensitiveMatches.length,
      hasSpam: hasSpamPatterns,
      contentLength: words.length
    });

    // Collect all flags
    const flags: string[] = [];
    if (hasProfanity) flags.push('profanity');
    if (hasSensitiveContent) flags.push('sensitive_content');
    if (hasSpamPatterns) flags.push('potential_spam');

    return {
      hasProfanity,
      classification: confidenceScore > 0.5 ? 'inappropriate' : 'appropriate',
      needsReview: confidenceScore > 0.3,
      confidence: confidenceScore,
      flags
    };
  }

  private calculateConfidenceScore({
    profanityCount,
    sensitiveCount,
    hasSpam,
    contentLength
  }: {
    profanityCount: number;
    sensitiveCount: number;
    hasSpam: boolean;
    contentLength: number;
  }): number {
    let score = 0;

    // Weight profanity more heavily
    if (profanityCount > 0) {
      score += (profanityCount / contentLength) * 0.5;
    }

    // Add weight for sensitive content
    if (sensitiveCount > 0) {
      score += (sensitiveCount / contentLength) * 0.3;
    }

    // Add fixed penalty for spam patterns
    if (hasSpam) {
      score += 0.2;
    }

    // Normalize score to 0-1 range
    return Math.min(Math.max(score, 0), 1);
  }

  async flagContent(contentId: string, reason: string): Promise<boolean> {
    // In a real implementation, this would store the flag in a database
    console.log('Content flagged:', { contentId, reason });
    return true;
  }

  async reviewContent(
    contentId: string, 
    action: 'approve' | 'reject', 
    moderatorNotes?: string
  ): Promise<boolean> {
    // In a real implementation, this would update the content status in a database
    console.log('Content reviewed:', { contentId, action, moderatorNotes });
    return true;
  }

  addProfanityWords(words: string[]): void {
    words.forEach(word => this.profanityList.add(word.toLowerCase()));
  }

  removeProfanityWords(words: string[]): void {
    words.forEach(word => this.profanityList.delete(word.toLowerCase()));
  }

  addSensitiveTopic(topic: string): void {
    this.sensitiveTopics.add(topic.toLowerCase());
  }

  removeSensitiveTopic(topic: string): void {
    this.sensitiveTopics.delete(topic.toLowerCase());
  }

  addSpamPattern(pattern: RegExp): void {
    this.spamPatterns.push(pattern);
  }
}

export const contentModerationService = new ContentModerationService();
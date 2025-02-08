import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class PasswordService {
  private readonly saltRounds = process.env.SALT_HASH; // Number of salt rounds for hashing

  // Hash password before saving
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(this.saltRounds));
    return bcrypt.hash(password, salt);
  }

  // Compare input password with stored hash
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/users/security/password.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    private usersServide: UsersService,
    private passService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    this.logger.log(`Intento login: ${username}`);
    const user = await this.usersServide.findOneByUsername(username);

    if (
      !user ||
      !(await this.passService.comparePassword(pass, user.password))
    ) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

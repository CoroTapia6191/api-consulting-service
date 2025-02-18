import { Body, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from 'src/users/security/password.service';
import { Role } from './entities/role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}
  async create(@Body() createUserDto: CreateUserDto) {
    const userCreated = await this.usersRepository.save({
      ...createUserDto,
      createdAt: new Date(),
      roles: [Role.GUEST],
      password: await this.passwordService.hashPassword(createUserDto.password),
    });

    const payload = { username: userCreated.username, sub: userCreated.id };

    this.logger.log(`User created: ${userCreated.username}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

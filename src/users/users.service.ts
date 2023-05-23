import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountInput, CreateAccountOutput } from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { JwtService } from '../jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { Verification } from './entities/verification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Verification) private readonly verificationRepository: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
    const { username } = createAccountInput;

    const exists = await this.usersRepository.findOne({ username });
    if (exists) throw new Error(`Username ${username} is already in use.`);

    const user = await this.usersRepository.create({ ...createAccountInput });
    await this.usersRepository.save(user);

    const verification = this.verificationRepository.create({ user });
    await this.verificationRepository.save(verification);

    return { ok: true };
  }

  async login(loginInput: LoginInput): Promise<LoginOutput> {
    const { username, password } = loginInput;

    const user = await this.usersRepository.findOne({ username }, { select: ['password', 'id', 'username'] });
    if (!user) throw new NotFoundException(`Username: ${username} not found`);

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid username or password');

    const token = this.jwtService.sign({ id: user.id, username: user.username });

    return { ok: true, token: token };
  }

  async findById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({ id: userId });
    if (!user) throw new NotFoundException(`user with id ${userId} not found`);

    return user;
  }

  async updateProfile(userId: number, userInput: EditProfileInput): Promise<EditProfileOutput> {
    const result = await this.usersRepository.preload({ id: userId, ...userInput });

    if (userInput.username) {
      result.username = userInput.username;

      await this.verificationRepository.delete({ user: { id: result.id } });
    }

    if (userInput.password) {
      result.password = userInput.password;
    }

    const user = await this.usersRepository.save(result);

    return { ok: true, user };
  }
}

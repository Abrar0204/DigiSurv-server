import { queryDto } from './../dto/query.dto';
import { CreateAccountDto, Role } from './../dto/account.dto';
import { Account } from './../entities/account.entity';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountsRepo: Repository<Account>,
  ) {}

  async getAllAccounts(queries: queryDto): Promise<Account[]> {
    const unfilteredData = await this.accountsRepo.find();
    console.log(queries);
    if (queries.filter?.student) {
      return unfilteredData.filter((acc) => acc.role === Role.Student);
    }
    if (queries.filter?.proctor) {
      return unfilteredData.filter((acc) => acc.role === Role.Proctor);
    }
    return unfilteredData;
  }

  async signup(createAccountDto: CreateAccountDto): Promise<Account> {
    try {
      const hashedPassword = await this.hashPassword(createAccountDto.password);

      const newAccount = await this.accountsRepo.create({
        ...createAccountDto,
        password: hashedPassword,
      });

      return this.accountsRepo.save(newAccount);
    } catch (err) {
      console.log(err.message);
      throw new BadRequestException();
    }
  }

  async signin(credentials: {
    username: string;
    password: string;
  }): Promise<{ token: string; name: string; role: Role; id: string }> {
    try {
      const acc = await this.accountsRepo.findOneOrFail({
        where: {
          username: credentials.username,
        },
        select: ['password', 'id', 'role', 'name'],
      });

      const passwordMatch = await this.verifyPassword(
        acc.password,
        credentials.password,
      );

      if (passwordMatch) {
        const token = await this.newToken(acc);
        return { token, name: acc.name, role: acc.role, id: acc.id };
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      console.log(err.message);
      throw new NotFoundException();
    }
  }

  newToken(account: Account) {
    return jwt.sign({ id: account.id, role: account.role }, process.env.jwt, {
      expiresIn: process.env.jwtExp,
    });
  }

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 8, (err, hash) => {
        if (err) {
          return reject(err);
        }

        resolve(hash);
      });
    });
  }

  verifyPassword(hashed: string, original: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(original, hashed, (err, same) => {
        if (err) {
          return reject(err);
        }

        resolve(same);
      });
    });
  }
}

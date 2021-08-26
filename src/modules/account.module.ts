import { AccountService } from './../services/account.service';
import { AccountController } from './../controllers/account.controller';
import { Account } from '../entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}

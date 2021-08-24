import { Account } from './entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [],
  providers: [],
})
export class AccountModule {}

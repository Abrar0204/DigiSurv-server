import { Option } from './entities/option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({ imports: [TypeOrmModule.forFeature([Option])] })
export class OptionModule {}

import { AuthGuard } from './../guards/auth.guard';
import { CreateAccountDto, Role } from './../dto/create/create-account.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountService } from 'src/services/account.service';

@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Request() req) {
    if (req.account.role !== Role.Admin) {
      throw new UnauthorizedException();
    }
    return this.accountService.getAllAccounts();
  }

  @Post('signup')
  @UseGuards(AuthGuard)
  createAccount(
    @Request() req,
    @Body()
    createAccountDto: CreateAccountDto,
  ) {
    if (req.account.role !== Role.Admin) {
      throw new UnauthorizedException();
    }
    return this.accountService.signup(createAccountDto);
  }

  @Post('signin')
  signIn(@Body() credentials: { username: string; password: string }) {
    return this.accountService.signin(credentials);
  }
}

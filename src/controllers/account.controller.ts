import { AuthGuard } from './../guards/auth.guard';
import { CreateAccountDto, Role } from './../dto/account.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { AccountService } from 'src/services/account.service';

@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {
    // accountService.signup({
    //   username: 'admin1',
    //   name: 'Admin #1',
    //   password: 'password',
    //   role: Role.Admin,
    // });
    // accountService.signup({
    //   username: 'student1',
    //   name: 'Student #1',
    //   password: 'password',
    //   role: Role.Student,
    // });
    // accountService.signup({
    //   username: 'student2',
    //   name: 'Student #2',
    //   password: 'password',
    //   role: Role.Student,
    // });
    // accountService.signup({
    //   username: 'student3',
    //   name: 'Student #3',
    //   password: 'password',
    //   role: Role.Student,
    // });
    // accountService.signup({
    //   username: 'student4',
    //   name: 'Student #4',
    //   password: 'password',
    //   role: Role.Student,
    // });
    // accountService.signup({
    //   username: 'proctor',
    //   name: 'Proctor #1',
    //   password: 'password',
    //   role: Role.Proctor,
    // });
    // accountService.signup({
    //   username: 'proctor2',
    //   name: 'Proctor #1',
    //   password: 'password',
    //   role: Role.Proctor,
    // });
    // accountService.signup({
    //   username: 'proctor3',
    //   name: 'Proctor #1',
    //   password: 'password',
    //   role: Role.Proctor,
    // });
    // accountService.signup({
    //   username: 'proctor4',
    //   name: 'Proctor #1',
    //   password: 'password',
    //   role: Role.Proctor,
    // });
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Request() req, @Query() q) {
    if (req.account.role !== Role.Admin) {
      throw new UnauthorizedException();
    }
    return this.accountService.getAllAccounts(q);
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

import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SigninDto} from "./dto/signin-dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  signIn(@Body() signInDto: SigninDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}

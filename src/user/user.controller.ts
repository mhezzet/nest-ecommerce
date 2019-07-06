import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO, RegisterDTO } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.decorator';
import { SellerGuard } from './seller.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  tempAuth(@User() user) {
    return { auth: 'works', user };
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      username: user.username,
      seller: user.seller,
      id: user._id,
    };
    const token = await this.userService.signPayLoad(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload = {
      username: user.username,
      seller: user.seller,
      id: user._id,
    };
    const token = await this.userService.signPayLoad(payload);

    return { user, token };
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/interfaces/user.interface';
import { LoginDTO, RegisterDTO } from './user.dto';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { sign } from 'jsonwebtoken';
import * as config from 'config';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private sanitizeUser(user: User) {
    return _.pick(user, [
      '_id',
      'username',
      'seller',
      'createdAt',
      'updatedAt',
    ]);
  }

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;

    let user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user is already exist', HttpStatus.BAD_REQUEST);
    }

    user = await this.userModel.create(userDTO);

    return this.sanitizeUser(user);
  }

  async findByLogin(userDTO: LoginDTO) {
    const { username, password } = userDTO;

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException(
        'username or password is invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new HttpException(
        'username or password is invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.sanitizeUser(user);
  }

  async signPayLoad(payload) {
    return await sign(payload, config.get('JWT_SECRET'));
  }

  async validateUser(payload: any) {
    return await this.userModel
      .findOne({ username: payload.username })
      .select('-password');
  }
}

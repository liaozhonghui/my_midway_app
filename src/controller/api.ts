import { Inject, Controller, Provide, Query, Get, Post, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse, IUserOptions } from '../interface';
import { ApiService } from '../service/api';
import { UserService } from '../service/user';

@Provide()
@Controller('/')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  apiService: ApiService;

  @Get('/user/get')
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid } as IUserOptions);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/user/incr')
  async incrUser(@Body() uid: string): Promise<IGetUserResponse> {
    await this.userService.incrOne({ uid } as IUserOptions);
    return { success: true, message: 'OK', data: null };
  }

  @Get('/list')
  async apiList(): Promise<any> {
    const apis = await this.apiService.apiList();
    return { success: true, message: 'OK', data: apis };
  }
}

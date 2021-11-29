import { Inject, Controller, Provide, Query, Get, Post, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse, IUserOptions } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

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
}

import { Controller, Get, Provide, Query } from '@midwayjs/decorator';
import { User } from '../interface';

@Provide()
@Controller('/api/user')
export class UserController {
  // xxx.

  @Get('/')
  async getUser(@Query() id: string): Promise<User> {
    // xxx.
    return {} as User;
  }
}

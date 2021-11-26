import { Inject, Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class UserService {
  @Inject()
  redisService: RedisService;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async incrOne() {
    await this.redisService.incr('user::count');
  }
}

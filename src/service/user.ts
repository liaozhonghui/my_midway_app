import { Inject, Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { RedisService } from '@midwayjs/redis';
import { isEmpty, isNil } from 'lodash';

@Provide()
export class UserService {
  @Inject()
  logger;
  @Inject()
  redisService: RedisService;

  async getUser(user: IUserOptions): Promise<string> {
    this.logger.info('user exists:' + JSON.stringify(user));
    if (isEmpty(user) || isNil(user.uid)) {
      this.logger.info('user is empty.');
      return this.redisService.get(`user::count`);
    }
    return this.redisService.get(`user::count::${user.uid}`);
  }

  async incrOne(user: IUserOptions) {
    await Promise.all([
      this.redisService.incr(`user::count`),
      this.redisService.incr(`user::count::${user.uid}`),
    ]);
  }
}

import { Inject, Provide, ServerlessTrigger, ServerlessTriggerType } from "@midwayjs/decorator";
import { RedisService } from "@midwayjs/redis";
import { range } from "lodash";

@Provide()
export class ApiService {
  @Inject()
  logger;

  @Inject()
  redisService: RedisService;


  async apiList() {
    return range(0, 10, 1);
  }

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    path: '/public/*',
    method: 'get'
  })
  async render() {
    // 目的是为了让static全局中间件被执行.
  }
}

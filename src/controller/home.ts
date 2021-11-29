import { Controller, Get, Inject, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
@Provide()
@Controller('/')
export class HomeController {
  @Inject()
  logger;

  @Inject()
  ctx: Context;

  @Get('/home')
  async home() {
    this.ctx.session.visited = this.ctx.session.visited ? (this.ctx.session.visited + 1) : 1;
    this.logger.info(`user session visited: ${this.ctx.session.visited}.`);
    return 'Hello Midwayjs!';
  }
}

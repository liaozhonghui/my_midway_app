import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as redis from '@midwayjs/redis';
import * as staticCache from 'koa-static-cache';

@Configuration({
  imports: [
    redis
  ],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    this.app.use(await this.app.generateMiddleware('reportMiddleware'));
    this.app.use(staticCache({
      prefix: '/public/',
      dir: join(__dirname, '../public'),
      dynamic: true,
      preload: false,
      buffer: true,
      maxFiles: 1000
    }));
  }
}

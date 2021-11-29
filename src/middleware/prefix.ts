import { Provide } from '@midwayjs/decorator';

@Provide()
export class PrefixMiddleware {
  resolve() {
    return async (ctx, next) => {
      ctx.path = (ctx.path.replace(/^\/api/, '') || '/');
      await next();
    };
  }
}

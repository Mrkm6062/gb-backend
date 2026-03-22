import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const CurrentTenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Prioritize the tenantId from JWT user (admin APIs), fallback to middleware tenantId (storefront APIs)
    const tenantId = request.user?.shopId || request.tenantId;
    
    if (!tenantId) {
      throw new UnauthorizedException('Tenant context is missing. Cannot proceed safely.');
    }
    
    return tenantId;
  },
);

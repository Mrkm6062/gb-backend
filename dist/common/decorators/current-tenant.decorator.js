"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentTenant = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentTenant = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const tenantId = request.user?.shopId || request.tenantId;
    if (!tenantId) {
        throw new common_1.UnauthorizedException('Tenant context is missing. Cannot proceed safely.');
    }
    return tenantId;
});
//# sourceMappingURL=current-tenant.decorator.js.map
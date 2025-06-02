"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
const common_1 = require("@nestjs/common");
exports.Tenant = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const tenant = request.tenant;
    if (data) {
        return tenant?.[data];
    }
    return tenant;
});
//# sourceMappingURL=tenant.decorator.js.map
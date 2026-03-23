"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const shops_module_1 = require("./modules/shops/shops.module");
const products_module_1 = require("./modules/products/products.module");
const orders_module_1 = require("./modules/orders/orders.module");
const tenant_middleware_1 = require("./common/middleware/tenant.middleware");
const shop_schema_1 = require("./modules/shops/schemas/shop.schema");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(tenant_middleware_1.TenantMiddleware)
            .forRoutes({ path: 'storefront/products', method: common_1.RequestMethod.GET }, { path: 'storefront/orders', method: common_1.RequestMethod.POST });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([{ name: shop_schema_1.Shop.name, schema: shop_schema_1.ShopSchema }]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            shops_module_1.ShopsModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
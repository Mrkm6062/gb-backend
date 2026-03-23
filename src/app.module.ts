import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ShopsModule } from './modules/shops/shops.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { Shop, ShopSchema } from './modules/shops/schemas/shop.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    AuthModule,
    UsersModule,
    ShopsModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply subdomain tenant detection ONLY for public storefront routes
    consumer
      .apply(TenantMiddleware)
      .forRoutes(
        { path: 'storefront/products', method: RequestMethod.GET },
        { path: 'storefront/orders', method: RequestMethod.POST }
      );
  }
}

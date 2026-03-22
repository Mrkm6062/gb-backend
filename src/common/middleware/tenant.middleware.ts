import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from '../../modules/shops/schemas/shop.schema';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(@InjectModel(Shop.name) private shopModel: Model<ShopDocument>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.headers.host;
    if (!host) throw new NotFoundException('Host header is missing');

    // Example: shop1.galibrand.cloud -> subdomain is 'shop1'
    const subdomain = host.split('.')[0];
    
    // Bypass for localhost during dev if needed, or handle specifically
    if (subdomain === 'localhost' || subdomain === '127') {
      return next();
    }

    const shop = await this.shopModel.findOne({ subdomain }).exec();
    if (!shop) {
      throw new NotFoundException(`Tenant store '${subdomain}' not found.`);
    }

    // Attach shopId to request for downstream controllers
    req['tenantId'] = shop._id.toString();
    next();
  }
}

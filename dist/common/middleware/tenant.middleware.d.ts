import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { ShopDocument } from '../../modules/shops/schemas/shop.schema';
export declare class TenantMiddleware implements NestMiddleware {
    private shopModel;
    constructor(shopModel: Model<ShopDocument>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}

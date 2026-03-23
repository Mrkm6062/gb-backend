import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import { ShopDocument } from '../shops/schemas/shop.schema';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private userModel;
    private shopModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, shopModel: Model<ShopDocument>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        message: string;
        shop: {
            name: string;
            subdomain: string;
            url: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        shopId: string;
        role: string;
    }>;
}

import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Shop, ShopDocument } from '../shops/schemas/shop.schema';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) throw new ConflictException('Email already in use');

    // Generate Subdomain
    const baseSubdomain = dto.shopName.toLowerCase().replace(/[^a-z0-9]/g, '');
    let subdomain = baseSubdomain;
    let counter = 1;
    while (await this.shopModel.findOne({ subdomain })) {
      subdomain = `${baseSubdomain}`;
      counter++;
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Create User (without shopId initially)
    const user = new this.userModel({
      email: dto.email,
      passwordHash,
      role: 'admin',
    });
    const savedUser = await user.save();

    // Create Shop
    const shop = new this.shopModel({
      name: dto.shopName,
      category: dto.category,
      subdomain,
      ownerId: savedUser._id,
    });
    const savedShop = await shop.save();

    // Update User with shopId
    savedUser.shopId = savedShop._id as any;
    await savedUser.save();

    return {
      message: 'Shop created successfully',
      shop: {
        name: savedShop.name,
        subdomain: savedShop.subdomain,
        url: `https://${savedShop.subdomain}.galibrand.cloud`,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user._id, shopId: user.shopId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      shopId: user.shopId,
      role: user.role,
    };
  }
}
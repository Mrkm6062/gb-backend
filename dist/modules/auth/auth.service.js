"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../users/schemas/user.schema");
const shop_schema_1 = require("../shops/schemas/shop.schema");
let AuthService = class AuthService {
    constructor(userModel, shopModel, jwtService) {
        this.userModel = userModel;
        this.shopModel = shopModel;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existingUser = await this.userModel.findOne({ email: dto.email });
        if (existingUser)
            throw new common_1.ConflictException('Email already in use');
        const baseSubdomain = dto.shopName.toLowerCase().replace(/[^a-z0-9]/g, '');
        let subdomain = baseSubdomain;
        let counter = 1;
        while (await this.shopModel.findOne({ subdomain })) {
            subdomain = `${baseSubdomain}`;
            counter++;
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = new this.userModel({
            email: dto.email,
            passwordHash,
            role: 'admin',
        });
        const savedUser = await user.save();
        const shop = new this.shopModel({
            name: dto.shopName,
            category: dto.category,
            subdomain,
            ownerId: savedUser._id,
        });
        const savedShop = await shop.save();
        savedUser.shopId = savedShop._id;
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
    async login(dto) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { sub: user._id, shopId: user.shopId, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            shopId: user.shopId,
            role: user.role,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(shop_schema_1.Shop.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
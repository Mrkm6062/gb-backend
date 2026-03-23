"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../modules/users/schemas/user.schema");
const shop_schema_1 = require("../modules/shops/schemas/shop.schema");
const bcrypt = require("bcrypt");
async function bootstrapSeed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    const shopModel = app.get((0, mongoose_1.getModelToken)(shop_schema_1.Shop.name));
    console.log('Clearing existing demo data...');
    await userModel.deleteMany({ email: 'demo@galibrand.cloud' });
    await shopModel.deleteMany({ subdomain: 'demo' });
    console.log('Seeding demo tenant...');
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = new userModel({
        email: 'demo@galibrand.cloud',
        passwordHash,
        role: 'admin'
    });
    const savedUser = await user.save();
    const shop = new shopModel({
        name: 'Demo Store',
        category: 'Electronics',
        subdomain: 'demo',
        ownerId: savedUser._id,
        settings: {
            payment: { codEnabled: true },
            deliveryOptions: ['Standard', 'Express']
        }
    });
    const savedShop = await shop.save();
    savedUser.shopId = savedShop._id;
    await savedUser.save();
    console.log(`✅ Seed complete! Login with demo@galibrand.cloud / password123`);
    console.log(`🌍 Storefront available at http://demo.galibrand.cloud:3000/api/storefront/products`);
    await app.close();
}
bootstrapSeed();
//# sourceMappingURL=seed.js.map
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../modules/users/schemas/user.schema';
import { Shop } from '../modules/shops/schemas/shop.schema';
import * as bcrypt from 'bcrypt';

async function bootstrapSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const shopModel = app.get<Model<Shop>>(getModelToken(Shop.name));

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

  savedUser.shopId = savedShop._id as any;
  await savedUser.save();

  console.log(`✅ Seed complete! Login with demo@galibrand.cloud / password123`);
  console.log(`🌍 Storefront available at http://demo.galibrand.cloud:3000/api/storefront/products`);
  
  await app.close();
}

bootstrapSeed();
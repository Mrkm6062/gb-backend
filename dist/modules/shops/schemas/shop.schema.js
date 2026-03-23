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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopSchema = exports.Shop = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class PaymentSettings {
}
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], PaymentSettings.prototype, "codEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaymentSettings.prototype, "razorpayKeyId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PaymentSettings.prototype, "razorpayKeySecret", void 0);
class ShopSettings {
}
__decorate([
    (0, mongoose_1.Prop)({ type: PaymentSettings, default: () => ({ codEnabled: true }) }),
    __metadata("design:type", PaymentSettings)
], ShopSettings.prototype, "payment", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], ShopSettings.prototype, "deliveryOptions", void 0);
let Shop = class Shop {
};
exports.Shop = Shop;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Shop.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Shop.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Shop.prototype, "subdomain", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", String)
], Shop.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: ShopSettings, default: () => ({}) }),
    __metadata("design:type", ShopSettings)
], Shop.prototype, "settings", void 0);
exports.Shop = Shop = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Shop);
exports.ShopSchema = mongoose_1.SchemaFactory.createForClass(Shop);
//# sourceMappingURL=shop.schema.js.map
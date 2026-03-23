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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_tenant_decorator_1 = require("../../common/decorators/current-tenant.decorator");
const product_schema_1 = require("../products/schemas/product.schema");
let OrdersController = class OrdersController {
    constructor(orderModel, productModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
    }
    async placeOrder(body, tenantId) {
        let totalAmount = 0;
        for (const item of body.items) {
            const product = await this.productModel.findOne({ _id: item.productId, shopId: tenantId });
            if (!product)
                throw new common_1.BadRequestException(`Product ${item.productId} invalid or unavailable`);
            if (product.stock < item.quantity)
                throw new common_1.BadRequestException(`Insufficient stock for ${product.name}`);
            totalAmount += product.price * item.quantity;
            item.price = product.price;
            await this.productModel.updateOne({ _id: product._id }, { $inc: { stock: -item.quantity } });
        }
        const order = new this.orderModel({
            ...body,
            totalAmount,
            shopId: tenantId,
        });
        return order.save();
    }
    async getAdminOrders(tenantId) {
        return this.orderModel.find({ shopId: tenantId }).sort({ createdAt: -1 }).exec();
    }
    async updateOrderStatus(id, status, tenantId) {
        return this.orderModel.findOneAndUpdate({ _id: id, shopId: tenantId }, { status }, { new: true });
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)('storefront/orders'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_tenant_decorator_1.CurrentTenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "placeOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('admin/orders'),
    __param(0, (0, current_tenant_decorator_1.CurrentTenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getAdminOrders", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('admin/orders/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, current_tenant_decorator_1.CurrentTenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrderStatus", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map
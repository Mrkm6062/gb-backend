import { Document, Types } from 'mongoose';
export type OrderDocument = Order & Document;
declare class OrderItem {
    productId: string;
    quantity: number;
    price: number;
}
export declare class Order {
    customerName: string;
    phone: string;
    address: string;
    items: OrderItem[];
    totalAmount: number;
    paymentMethod: string;
    status: string;
    shopId: string;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, (Document<unknown, any, Order, any, import("mongoose").DefaultSchemaOptions> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Order, any, import("mongoose").DefaultSchemaOptions> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Order>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, Order, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    customerName?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    address?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    items?: import("mongoose").SchemaDefinitionProperty<OrderItem[], Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    totalAmount?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    paymentMethod?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    shopId?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Order>;
export {};

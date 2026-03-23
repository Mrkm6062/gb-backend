import { Document, Types } from 'mongoose';
export type ShopDocument = Shop & Document;
declare class PaymentSettings {
    codEnabled: boolean;
    razorpayKeyId?: string;
    razorpayKeySecret?: string;
}
declare class ShopSettings {
    payment: PaymentSettings;
    deliveryOptions: string[];
}
export declare class Shop {
    name: string;
    category: string;
    subdomain: string;
    ownerId: string;
    settings: ShopSettings;
}
export declare const ShopSchema: import("mongoose").Schema<Shop, import("mongoose").Model<Shop, any, any, any, (Document<unknown, any, Shop, any, import("mongoose").DefaultSchemaOptions> & Shop & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Shop, any, import("mongoose").DefaultSchemaOptions> & Shop & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Shop>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Shop, Document<unknown, {}, Shop, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Shop & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Shop, Document<unknown, {}, Shop, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shop & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    category?: import("mongoose").SchemaDefinitionProperty<string, Shop, Document<unknown, {}, Shop, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shop & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    subdomain?: import("mongoose").SchemaDefinitionProperty<string, Shop, Document<unknown, {}, Shop, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shop & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    ownerId?: import("mongoose").SchemaDefinitionProperty<string, Shop, Document<unknown, {}, Shop, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shop & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    settings?: import("mongoose").SchemaDefinitionProperty<ShopSettings, Shop, Document<unknown, {}, Shop, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Shop & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Shop>;
export {};

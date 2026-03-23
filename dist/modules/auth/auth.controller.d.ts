import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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

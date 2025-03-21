import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<any>;
    getRegistrationStats(): Promise<{
        totalRegistrations: any;
        targetRegistrations: number;
        progressPercentage: number;
    }>;
}

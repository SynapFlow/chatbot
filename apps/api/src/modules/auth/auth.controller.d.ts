import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, VerifyEmailDto, Enable2FADto, Verify2FADto, ChangePasswordDto } from './dto';
import { User } from '@chatbot-rag/database';
interface UpdateProfileDto {
    username?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        user: {
            id: any;
            email: any;
            username: any;
            role: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    login(req: any, _dto: LoginDto): Promise<{
        requiresTwoFactor: boolean;
        userId: any;
    } | {
        user: {
            id: any;
            email: any;
            username: any;
            role: any;
        };
        accessToken: string;
        refreshToken: string;
        requiresTwoFactor?: undefined;
        userId?: undefined;
    }>;
    refresh(req: any, _dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(user: User): Promise<{
        message: string;
    }>;
    getProfile(user: User): Promise<any>;
    updateProfile(user: User, dto: UpdateProfileDto): Promise<any>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    resendVerification(user: User): Promise<{
        message: string;
    }>;
    changePassword(user: User, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    enable2FA(user: User, dto: Enable2FADto): Promise<{
        secret: string;
        qrCode: string;
    }>;
    disable2FA(user: User, dto: Enable2FADto): Promise<{
        message: string;
    }>;
    verify2FA(dto: Verify2FADto): Promise<{
        user: {
            id: any;
            email: any;
            username: any;
            role: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
}
export {};
//# sourceMappingURL=auth.controller.d.ts.map
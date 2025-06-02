import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@chatbot-rag/database';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<User | null>;
    login(user: User): Promise<{
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
    refreshTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<any>;
    updateProfile(userId: string, dto: any): Promise<any>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerificationEmail(userId: string): Promise<{
        message: string;
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    enable2FA(userId: string, password: string): Promise<{
        secret: string;
        qrCode: string;
    }>;
    disable2FA(userId: string, password: string): Promise<{
        message: string;
    }>;
    verify2FA(userId: string, code: string): Promise<{
        user: {
            id: any;
            email: any;
            username: any;
            role: any;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    private generateTokens;
    private updateRefreshToken;
}
//# sourceMappingURL=auth.service.d.ts.map
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
interface RefreshTokenPayload {
    sub: string;
    email: string;
    iat?: number;
    exp?: number;
}
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(req: Request, payload: RefreshTokenPayload): {
        refreshToken: any;
        sub: string;
        email: string;
        iat?: number;
        exp?: number;
    };
}
export {};
//# sourceMappingURL=refresh-token.strategy.d.ts.map
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHandlerService {
    constructor(
        private jwtService: JwtService,
    ) { }

    async createDefaultJWT(id: string): Promise<string> {
        const payload = { id };
        try {
            return await this.jwtService.sign(payload);
        } catch (err) {
            throw new Error(`Can not create token: ${err.message}`);
        }
    }

    async createJWT(
        payload: any,
        secret: string,
        expiresIn: string,
    ): Promise<string> {
        try {
            return await this.jwtService.sign(payload, {
                secret,
                expiresIn,
            });
        } catch (err) {
            throw new Error(`Can not create token: ${err.message}`);
        }
    }

    async verifyToken(token, secret): Promise<any> {
        try {
            return await this.jwtService.verify(token, { secret });
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }
    }
}
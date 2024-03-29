import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
            //     return request?.cookies?.access_token;
            // }]),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(request, payload) {

        const xsrfToken = request.headers['x-xsrf-token']

        console.log('xsrfToken : ', xsrfToken)
        console.log('payload ', payload)

        if (xsrfToken !== payload.xsrfToken) {
            throw new UnauthorizedException('Bad xsrf token')
        }

        return { userId: payload.sub, username: payload.username, email: payload.email };
    }
}
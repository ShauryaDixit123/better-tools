import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService, ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { configService } from "src/configs/config.service";
import { mapEnvVariables } from "configs/local";
import { UserService } from "../users.service";
import { ExtractJwt } from "passport-jwt";

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: configService.getValue("GOOGLE_CLIENT_ID"),
      clientSecret: configService.getValue("GOOGLE_CLIENT_SECRET"),
      callbackURL: configService.getValue("GOOGLE_CALLBACK_URL"),
      scope: ["email", "profile"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      provider: "google",
      providerId: id,
      email: emails[0].value,
      first_name: `${name.givenName}`,
      last_name: `${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}

@Injectable()
export class JWTAuthStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @Inject(mapEnvVariables().database)
    private configService: ConfigType<typeof mapEnvVariables>,
    private readonly userService: UserService
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies["access_token"];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };
    super({
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
      jwtFromRequest: extractJwtFromCookie,
    });
  }
  // async validate(payload: JwtPayload) {
  //   const user = await this.userService.findUserById(payload.sub);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return {
  //     id: payload.sub,
  //     email: payload.email,
  //   };
  // }
}

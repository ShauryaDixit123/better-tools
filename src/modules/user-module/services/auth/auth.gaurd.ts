import { AuthGuard } from "@nestjs/passport";
import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { ExtractJwt } from "passport-jwt";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { configService } from "src/configs/config.service";
import { UserModuleService } from "../users.service";
import {
  AUTHOR_ROLE,
  INVALID_TOKEN,
  TOKEN_NOT_FOUND,
} from "../../constants/user.constant";
import { ServerError } from "src/common/exceptions/error";

@Injectable()
export class GoogleAuthGaurd extends AuthGuard("google") {}

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}

@Injectable()
export class JWTAuthGaurd extends AuthGuard("jwt") {}

@Injectable()
export class JWTActivateGuard implements CanActivate {
  constructor(protected readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    const token = authorization.replace(/bearer/gim, "").trim();
    if (!token) {
      throw new UnauthorizedException("Token not found");
    }
    const user = this.jwtService.verify(token, {
      secret: configService.getValue("JWT_SECRET"),
    });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException("Invalid Token");
    }
    return true;
  }
}

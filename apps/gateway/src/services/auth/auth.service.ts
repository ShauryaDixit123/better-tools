import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  genrateToken(secret: string, email: string) {
    return this.jwtService.sign({ email }, { secret });
  }
  verifyToken(secret: string, token: string) {
    return this.jwtService.verify(token, { secret });
  }
}

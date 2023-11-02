import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Inject,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "../services/users.service";
import { User as UserDTO } from "../dtos/user.type";
import {
  AUTHOR_ROLE,
  READER_ROLE,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_CREDENTIALS,
} from "../constants/user.constant";
import * as bcrypt from "bcrypt";
import { AuthService } from "../services/auth/auth.service";
import { ClientProxy } from "@nestjs/microservices";
import { JWTActivateGuard } from "../services/auth/auth.gaurd";
import { ServerError } from "src/common/exceptions/error";
import { InjectRepository } from "@nestjs/typeorm";
import { configService } from "src/configs/config.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post("/add")
  async addUser(@Body() user: UserDTO) {
    const apiKey = this.authService.genrateToken(
      user.email,
      configService.getValue("API_KEY_HASH_SECRET")
    );
    const password = await bcrypt.hash(user.password, 5);
    const res = await this.userService.addUser({ ...user, password, apiKey });
    return {
      apiKey: res.apiKey,
      id: res.id,
    };
  }
}

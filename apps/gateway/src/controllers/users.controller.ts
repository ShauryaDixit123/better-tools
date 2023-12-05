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
import { User as UserDTO } from "../dtos/user.dto";
import * as bcrypt from "bcrypt";
import { AuthService } from "../services/auth/auth.service";
import { configService } from "apps/configs/config.service";
import { ServerError } from "common/exceptions/error";

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
    try {
      const res = await this.userService.addUser({ ...user, password, apiKey });
      return {
        apiKey: res.apiKey,
        id: res.id,
      };
    } catch (e) {
      throw new ServerError(e.message);
    }
  }
  @Get("/ping")
  async ping() {
    return "pong";
  }
  @Post("add/serviceUser")
  async addServiceUser(
    @Body() body: { uniqueId: string; parentUser: string }
  ): Promise<string> {
    return await this.userService.createServiceUser(body);
  }
}

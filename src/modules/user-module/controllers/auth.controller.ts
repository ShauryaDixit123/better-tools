import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Res,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { GoogleAuthGaurd } from "../services/auth/auth.gaurd";
import { AuthService } from "../services/auth/auth.service";
import { Response } from "express";
import { User as UserDTO } from "../dtos/user.type";
import {
  AUTHOR_ROLE,
  READER_ROLE,
  USER_NOT_FOUND,
  WRONG_CREDENTIALS,
} from "../constants/user.constant";
import { UserModuleService } from "../services/users.service";

import { MessageError, ServerError } from "src/common/exceptions/error";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

@Controller("auth")
export class AuthController {}

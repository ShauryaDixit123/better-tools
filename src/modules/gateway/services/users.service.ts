import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";

import { User as UserDTO } from "../dtos/user.type";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/users.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async addUser(user: UserDTO): Promise<User> {
    return await this.userRepository.save(user);
  }
  async updateApiKey(email: string, apiKey: string): Promise<Boolean> {
    return (await this.userRepository.update(
      { email },
      {
        apiKey,
      }
    ))
      ? true
      : false;
  }
}

// {
//     "first_name":"Shaurya",
//     "last_name":  "Dixit",
//     "email" : "shaurd224@gmail.com",
//     "mobile": "87870000",
//     "password": "shauryad224",
//     "is_author": false
// }

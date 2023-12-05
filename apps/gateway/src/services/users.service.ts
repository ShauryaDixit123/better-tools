import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";

import { User as UserDTO } from "../dtos/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ServiceUser, User } from "../entities/users.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ServiceUser)
    private readonly serviceUserRepository: Repository<ServiceUser>
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
  async createServiceUser(user: {
    uniqueId: string;
    parentUser: string;
  }): Promise<string> {
    return (await this.serviceUserRepository.save(user)).id;
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

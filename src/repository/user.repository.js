import { CreateUserDto } from "../Dao/Dto/contact.dto.js";

export class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async CreateUserDto(user) {
    const userDto = new CreateUserDto(user);
    return userDto;
  }
}

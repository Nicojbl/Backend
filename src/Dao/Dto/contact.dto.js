export class CreateUserDto {
  constructor(user) {
    this.fullName = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.age = user.age;
    this.rolAdmin = user.rolAdmin;
  }
}

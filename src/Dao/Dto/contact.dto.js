export class CreateUserDto {
  constructor(user) {
    this.fullName = `${user.first_name} ${user.last_name}`;
    this._id = user._id;
    this.email = user.email;
    this.age = user.age;
    this.rolAdmin = user.rolAdmin;
    this.rolPremium = user.rolPremium;
  }
}

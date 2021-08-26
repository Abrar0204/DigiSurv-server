export enum Role {
  Student = 'student',
  Admin = 'admin',
  Proctor = 'proctor',
}

export class CreateAccountDto {
  username: string;
  password: string;
  name: string;
  role: Role;
}

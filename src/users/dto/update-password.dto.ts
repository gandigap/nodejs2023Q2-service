import { IsNotEmpty } from 'class-validator';

export class UpdateUserdDto {
  @IsNotEmpty()
  oldPassword: string; // previous password
  @IsNotEmpty()
  newPassword: string; // new password
}

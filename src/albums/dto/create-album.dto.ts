import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  readonly artistId: string | null;
  @IsNumber()
  @IsNotEmpty()
  readonly year: number;
}

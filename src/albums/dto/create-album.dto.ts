import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly artistId: string;

  @IsNumber()
  readonly year: number;
}

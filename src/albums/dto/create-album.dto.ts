import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly artistId: string;

  @IsNumber()
  readonly year: number;
}

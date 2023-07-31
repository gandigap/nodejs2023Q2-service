import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly artistId: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;
}

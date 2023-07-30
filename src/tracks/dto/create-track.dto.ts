import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  readonly artistId: string | null;
  readonly albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  readonly artistId: string | null;
  readonly albumId: string | null;

  @IsNotEmpty()
  readonly duration: number;
}

import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly artistId: string | null;

  @IsOptional()
  readonly albumId: string | null;

  @IsNotEmpty()
  readonly duration: number;
}

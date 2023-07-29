import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  year: number;
  @IsOptional()
  artistId: string | null;
}

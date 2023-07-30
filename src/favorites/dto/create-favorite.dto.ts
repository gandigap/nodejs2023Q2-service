import { IsNotEmpty } from 'class-validator';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';

export class CreateFavoriteDto {
  @IsNotEmpty()
  readonly artists: Artist[];
  @IsNotEmpty()
  readonly albums: Album[];
  @IsNotEmpty()
  readonly tracks: Track[];
}

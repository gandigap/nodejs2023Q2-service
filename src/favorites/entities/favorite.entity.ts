import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, (artist) => artist, { cascade: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Track, (track) => track, { cascade: true })
  @JoinTable()
  tracks: Track[];

  @ManyToMany(() => Album, (album) => album, { cascade: true })
  @JoinTable()
  albums: Album[];
}

export interface FavoritesResponse {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}

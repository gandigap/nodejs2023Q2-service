import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorite' })
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Album, (album) => album, { cascade: true })
  @JoinTable()
  albums: Album[];
  @ManyToMany(() => Track, (track) => track, { cascade: true })
  @JoinTable()
  tracks: Track[];
  @ManyToMany(() => Artist, (artist) => artist, { cascade: true })
  @JoinTable()
  artists: Artist[];
}

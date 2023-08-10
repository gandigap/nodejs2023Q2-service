import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';

@Entity({ name: 'artist' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];
  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];
}

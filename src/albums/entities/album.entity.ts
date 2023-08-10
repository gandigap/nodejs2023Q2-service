import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Entity({ name: 'album' })
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: Artist;
  @OneToMany(() => Track, (track) => track.albumId)
  tracks: Track[];
}

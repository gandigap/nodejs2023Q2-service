import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DBService } from 'src/db/db.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private db: DBService) {}
  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    this.db.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string): Artist | undefined {
    return this.db.artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist | undefined {
    const artist = this.db.artists.find((artist) => artist.id === id);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  remove(id: string) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);
    this.db.artists.splice(artistIndex, 1);
  }
}

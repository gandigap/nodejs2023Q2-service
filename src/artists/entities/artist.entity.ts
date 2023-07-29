import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(createArtistDto: Partial<CreateArtistDto>) {
    this.id = uuidv4();
    this.name = createArtistDto.name;
    this.grammy = createArtistDto.grammy;
  }
}

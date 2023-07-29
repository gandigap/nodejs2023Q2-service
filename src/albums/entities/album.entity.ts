import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(createAlbumDto: Partial<CreateAlbumDto>) {
    this.id = uuidv4();
    this.name = createAlbumDto.name;
    this.year = createAlbumDto.year;
    this.artistId = createAlbumDto.artistId || null;
  }
}

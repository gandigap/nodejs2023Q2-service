import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(createTrackDto: CreateTrackDto) {
    this.id = uuidv4();
    this.name = createTrackDto.name;
    this.artistId = createTrackDto.artistId;
    this.albumId = createTrackDto.albumId;
    this.duration = createTrackDto.duration;
  }
}

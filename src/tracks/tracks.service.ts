import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private db: DBService) {}
  create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    this.db.tracks.push(track);

    return track;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string): Track | undefined {
    return this.db.tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track | undefined {
    const track = this.db.tracks.find((track) => track.id === id);
    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId || null;
    track.albumId = updateTrackDto.albumId || null;
    track.duration = updateTrackDto.duration;
    return track;
  }

  remove(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);
    this.db.tracks.splice(trackIndex, 1);
  }
}

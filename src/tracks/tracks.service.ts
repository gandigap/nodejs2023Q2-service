import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Repository } from 'typeorm';
import { CustomErrors } from 'src/constants/errors';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = await this.tracksRepository.create({ ...createTrackDto });

    return await this.tracksRepository.save(newTrack);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track | undefined> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(CustomErrors.TrackNotExist, HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track | undefined> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(CustomErrors.TrackNotExist, HttpStatus.NOT_FOUND);
    }

    const updatedTrack = { ...track, ...updateTrackDto };

    await this.tracksRepository.save(updatedTrack);

    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(CustomErrors.TrackNotExist, HttpStatus.NOT_FOUND);
    }

    await this.tracksRepository.delete(id);
  }
}

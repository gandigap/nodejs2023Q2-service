import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { FavoritesService } from 'src/favorites/favorites.service';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

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
      return null;
    }

    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track | undefined> {
    const track = await this.tracksRepository.findOneBy({ id });

    const updatedTrack = { ...track, ...updateTrackDto };

    await this.tracksRepository.save(updatedTrack);

    return updatedTrack;
  }

  async remove(id: string) {
    await this.tracksRepository.delete(id);
  }
}

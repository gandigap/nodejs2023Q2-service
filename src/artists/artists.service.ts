import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumsService } from 'src/albums/albums.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { CustomErrors } from 'src/constants/errors';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,

    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.artistsRepository.create({
      ...createArtistDto,
    });

    return await this.artistsRepository.save(newArtist);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist | undefined> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        CustomErrors.ArtistNotExist,
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | undefined> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        CustomErrors.ArtistNotExist,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedArtist = { ...artist, ...updateArtistDto };

    await this.artistsRepository.save(updatedArtist);

    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        CustomErrors.ArtistNotExist,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.artistsRepository.delete(id);
  }
}

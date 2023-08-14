import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,

    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.albumsRepository.create({ ...createAlbumDto });

    return await this.albumsRepository.save(album);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album | undefined> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      return null;
    }

    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | undefined> {
    const album = await this.albumsRepository.findOneBy({ id });

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    const updatedAlbum = { ...album, ...updateAlbumDto };

    await this.albumsRepository.save(updatedAlbum);
    return updatedAlbum;
  }

  async remove(id: string) {
    await this.albumsRepository.delete(id);
  }
}

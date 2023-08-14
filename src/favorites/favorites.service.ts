import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

import { Favorites } from './entities/favorite.entity';
import { CustomErrors } from 'src/constants/errors';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  async create() {
    const favorites = this.favoritesRepository.create();

    return await this.favoritesRepository.save(favorites);
  }

  async getFavorites() {
    let favorites = await this.favoritesRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (!favorites.length) {
      await this.create();

      favorites = await this.favoritesRepository.find({
        relations: {
          artists: true,
          albums: true,
          tracks: true,
        },
      });
    }

    return favorites[0];
  }

  async findAll() {
    const favorites = await this.getFavorites();

    return {
      artists: favorites.artists,
      albums: favorites.albums,
      tracks: favorites.tracks,
    };
  }

  async addFavoriteTrack(id: string) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new HttpException(
        CustomErrors.TrackNotExist,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavorites();
    favorites.tracks.push(track);

    await this.favoritesRepository.save(favorites);
  }

  async removeFavoriteTrack(id: string) {
    const favorites = await this.getFavorites();
    const track = favorites.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException(
        CustomErrors.FavoriteTrackNotExist,
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.tracks = favorites.tracks.filter((track) => track.id !== id);

    await this.favoritesRepository.save(favorites);
  }

  async addFavoriteAlbum(id: string) {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new HttpException(
        CustomErrors.AlbumNotExist,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavorites();
    favorites.albums.push(album);

    await this.favoritesRepository.save(favorites);
  }

  async removeFavoriteAlbum(id: string) {
    const favorites = await this.getFavorites();
    const album = favorites.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(
        CustomErrors.FavoriteAlbumNotExist,
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.albums = favorites.albums.filter((album) => album.id !== id);

    await this.favoritesRepository.save(favorites);
  }

  async addFavoriteArtist(id: string) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new HttpException(
        CustomErrors.ArtistNotExist,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavorites();
    favorites.artists.push(artist);

    await this.favoritesRepository.save(favorites);
  }

  async removeFavoriteArtist(id: string) {
    const favorites = await this.getFavorites();
    const artist = favorites.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(
        CustomErrors.FavoriteArtistNotExist,
        HttpStatus.NOT_FOUND,
      );
    }

    favorites.artists = favorites.artists.filter((artist) => artist.id !== id);

    await this.favoritesRepository.save(favorites);
  }
}

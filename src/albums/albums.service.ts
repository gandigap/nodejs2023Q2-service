import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private db: DBService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    this.db.albums.push(album);

    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string): Album | undefined {
    return this.db.albums.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album | undefined {
    const album = this.db.albums.find((album) => album.id === id);
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;
    return album;
  }

  remove(id: string) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id);
    const albumFavoritesIndex = this.db.favorites.albums.findIndex(
      (album) => album === id,
    );

    if (albumIndex === -1) {
      throw new NotFoundException();
    }
    if (albumFavoritesIndex !== -1) {
      this.db.favorites.albums.splice(albumFavoritesIndex, 1);
    }

    this.db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.db.albums.splice(albumIndex, 1);
  }
}

import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { DBService } from 'src/db/db.service';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(private db: DBService) {
    this.db.favorites = {
      artists: [],
      tracks: [],
      albums: [],
    };
  }

  findAll() {
    const favoritesEntries = Object.entries(this.db.favorites);
    const result = favoritesEntries.reduce((acc, [key, collection]) => {
      acc[key] = collection.map((id) => {
        const entities = this.db[key] as (Track | Album | Artist)[];

        return entities.find((entity) => entity.id === id);
      });
      return acc;
    }, {});
    return result;
  }

  addFavoriteArtist(id: string) {
    if (!this.db.favorites?.artists.includes(id)) {
      this.db.favorites.artists = [id];
    }
    return id;
  }

  deleteFavoriteArtist(id: string) {
    let result = false;
    this.db.favorites.artists = this.db.favorites.artists.filter((artistId) => {
      if (artistId === id) {
        result = true;
        return false;
      }
      return true;
    });

    return result;
  }

  addFavoriteAlbum(id: string) {
    if (!this.db.favorites.albums.includes(id)) {
      this.db.favorites.albums = [...this.db.favorites.albums, id];
    }
  }

  deleteFavoriteAlbum(id: string) {
    let result = false;
    this.db.favorites.albums = this.db.favorites.albums.filter((albumId) => {
      if (albumId === id) {
        result = true;
        return false;
      }
      return true;
    });

    return result;
  }

  addFavoriteTrack(id: string) {
    if (!this.db.favorites.tracks.includes(id)) {
      this.db.favorites.tracks = [...this.db.favorites.tracks, id];
    }
  }

  deleteFavoriteTrack(id: string) {
    let result = false;
    this.db.favorites.tracks = this.db.favorites.tracks.filter((trackId) => {
      if (trackId === id) {
        result = true;
        return false;
      }
      return true;
    });

    return result;
  }
}

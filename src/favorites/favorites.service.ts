import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private db: DBService) {}

  findAll() {
    return this.db.favorites;
  }

  addArtistToFavorites(id: string) {
    // this.db.favorites.tracks.push(id);
    return id;
  }
}

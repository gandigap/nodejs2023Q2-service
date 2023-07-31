import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';

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
        const entities = this.db[key];

        return entities.find((entity) => entity.id === id);
      });
      return acc;
    }, {});
    return result;
  }

  addFavoriteEntity(id: string, entityName) {
    const index = this.db[entityName].findIndex((entity) => entity.id === id);

    if (index === -1) {
      throw new UnprocessableEntityException();
    }

    if (!this.db.favorites[entityName].includes(id)) {
      this.db.favorites[entityName] = [...this.db.favorites[entityName], id];
    }
  }

  deleteFavoriteEntity(id: string, entityName) {
    let result = false;
    this.db.favorites[entityName] = this.db.favorites[entityName].filter(
      (entity) => {
        if (entity === id) {
          result = true;
          return false;
        }
        return true;
      },
    );

    return result;
  }
}

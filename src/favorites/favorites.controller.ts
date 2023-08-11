import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtistToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addFavoriteArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeFavoriteArtist(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbumToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addFavoriteAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeFavoriteAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrackToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addFavoriteTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.removeFavoriteTrack(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { StatusCodes } from 'http-status-codes';
import { Entities } from 'src/constants/errors';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.addFavoriteEntity(id, Entities.Tracks);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteFavoriteEntity(id, Entities.Tracks);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.addFavoriteEntity(id, Entities.Albums);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteFavoriteEntity(id, Entities.Albums);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.addFavoriteEntity(id, Entities.Artists);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteFavoriteEntity(id, Entities.Artists);
  }
}

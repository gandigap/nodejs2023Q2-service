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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.addFavoriteTrack(id);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteFavoriteTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.addFavoriteAlbum(id);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteFavoriteAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.addFavoriteArtist(id);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete('artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteFavoriteArtist(id);
  }
}

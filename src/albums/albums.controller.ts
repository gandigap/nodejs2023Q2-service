import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  HttpCode,
  HttpException,
} from '@nestjs/common';

import { CustomErrors } from 'src/constants/errors';

import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumsService.findOne(id);

    if (album) {
      return album;
    }

    throw new HttpException(CustomErrors.AlbumNotExist, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.findOne(id);

    if (album) {
      return await this.albumsService.update(id, updateAlbumDto);
    }

    throw new HttpException(CustomErrors.AlbumNotExist, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumsService.findOne(id);

    if (album) {
      return await this.albumsService.remove(id);
    }

    throw new HttpException(CustomErrors.AlbumNotExist, HttpStatus.NOT_FOUND);
  }
}

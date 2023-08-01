import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
  HttpException,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CustomErrors } from 'src/constants/errors';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumsService.findOne(id);
    if (album) {
      return album;
    }
    throw new HttpException(CustomErrors.AlbumNotExist, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumsService.findOne(id);
    if (album) {
      return this.albumsService.update(id, updateAlbumDto);
    }

    throw new HttpException(CustomErrors.AlbumNotExist, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumsService.findOne(id);
    if (album) {
      return this.albumsService.remove(id);
    }
    throw new HttpException(CustomErrors.AlbumNotExist, HttpStatus.NOT_FOUND);
  }
}

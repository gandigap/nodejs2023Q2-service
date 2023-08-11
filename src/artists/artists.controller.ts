import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpException,
} from '@nestjs/common';

import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CustomErrors } from 'src/constants/errors';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    const artist = await this.artistsService.create(createArtistDto);
    return artist;
  }

  @Get()
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistsService.findOne(id);

    if (artist) {
      return artist;
    }

    throw new HttpException(CustomErrors.ArtistNotExist, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistsService.findOne(id);

    if (artist) {
      return await this.artistsService.update(id, updateArtistDto);
    }

    throw new HttpException(CustomErrors.ArtistNotExist, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistsService.findOne(id);

    if (artist) {
      return await this.artistsService.remove(id);
    }

    throw new HttpException(CustomErrors.ArtistNotExist, HttpStatus.NOT_FOUND);
  }
}

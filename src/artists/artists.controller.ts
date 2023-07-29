import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CustomErrors } from 'src/constants/errors';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistsService.findOne(id);
    if (artist) {
      return artist;
    }
    throw new HttpException(CustomErrors.artistNotExist, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.artistsService.findOne(id);
    if (artist) {
      return this.artistsService.update(id, updateArtistDto);
    }

    throw new HttpException(CustomErrors.artistNotExist, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistsService.findOne(id);
    if (artist) {
      return this.artistsService.remove(id);
    }
    throw new HttpException(CustomErrors.artistNotExist, HttpStatus.NOT_FOUND);
  }
}

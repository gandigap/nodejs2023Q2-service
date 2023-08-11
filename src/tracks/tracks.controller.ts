import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
} from '@nestjs/common';

import { CustomErrors } from 'src/constants/errors';

import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.tracksService.findOne(id);

    if (track) {
      return track;
    }

    throw new HttpException(CustomErrors.TrackNotExist, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const artist = await this.tracksService.findOne(id);

    if (artist) {
      return await this.tracksService.update(id, updateTrackDto);
    }

    throw new HttpException(CustomErrors.TrackNotExist, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.tracksService.findOne(id);

    if (track) {
      return await this.tracksService.remove(id);
    }

    throw new HttpException(CustomErrors.TrackNotExist, HttpStatus.NOT_FOUND);
  }
}

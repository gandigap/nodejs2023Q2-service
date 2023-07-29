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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CustomErrors } from 'src/constants/errors';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.tracksService.findOne(id);
    if (track) {
      return track;
    }
    throw new HttpException(CustomErrors.trackNotExist, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const artist = this.tracksService.findOne(id);
    if (artist) {
      return this.tracksService.update(id, updateTrackDto);
    }

    throw new HttpException(CustomErrors.trackNotExist, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.tracksService.findOne(id);
    if (track) {
      return this.tracksService.remove(id);
    }
    throw new HttpException(CustomErrors.trackNotExist, HttpStatus.NOT_FOUND);
  }
}

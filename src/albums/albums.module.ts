import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

import { Album } from './entities/album.entity';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}

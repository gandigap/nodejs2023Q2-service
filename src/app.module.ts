import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBService } from './db/db.service';
import { UsersModule } from './users/users.module';
import { DBModule } from './db/db.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [DBModule, UsersModule, ArtistsModule, TracksModule],
  controllers: [AppController],
  providers: [AppService, DBService],
})
export class AppModule {}

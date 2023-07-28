import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBService } from './db/db.service';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { DBModule } from './db/db.module';

@Module({
  imports: [DBModule, UsersModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService, DBService],
})
export class AppModule {}

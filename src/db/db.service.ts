import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/entities/artist.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DBService {
  users: User[] = [];
  artists: Artist[] = [];
}

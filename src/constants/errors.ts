export enum CustomErrors {
  UserExist = 'User exist',
  UserNotExist = "User doesn't exist",
  PasswordsEquals = 'Passwords are equals',
  OldPasswordWrong = 'Old password is wrong',
  ArtistNotExist = "Artist doesn't exist",
  FavoriteArtistNotExist = "Favorite artist doesn't exist",
  TrackNotExist = "Track doesn't exist",
  FavoriteTrackNotExist = "Favorite track doesn't exist",
  AlbumNotExist = "Album doesn't exist",
  FavoriteAlbumNotExist = "Favorite album doesn't exist",
  TokenNotExist = 'Token doesn`t exist',
  VerifyFailed = 'Verify failed',
  UserWithLoginNotExist = 'User with this login doesn`t exist',
  PasswordsNotEdentic = 'Passwords don`t edentic',
  RefreshTokenNotExist = 'Refresh token doesn`t exist',
}

export enum Entities {
  Tracks = 'tracks',
  Albums = 'albums',
  Artists = 'artists',
}

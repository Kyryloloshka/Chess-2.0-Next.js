export interface IUserData {
  uid: string;
  email: string;
  gamesPlayed: number;
  username: string;
  gamesLosed: number,
  gamesWon: number,
  country: {value: string, label: string},
  status: null | string,
  bio: null | string,
  games: any,
}
export type Team = {
  id: number;
  name: string;
  img: string;
};

export type TeamAPI = {
  id: number;
  name: string;
  logo: string;
};

export type APIError = {
  error: string;
};

export type TeamsApi = {
  total: number;
  teams: Team[];
};

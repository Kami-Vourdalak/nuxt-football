import axios, { AxiosError } from "axios";
import { APIError, Team, TeamAPI, TeamsApi } from "@/types";
type TeamsQuery = {
  filter?: string;
  page?: number;
  limit?: number;
}
export default class TeamsClient {
  static uri = encodeURI(`http://localhost:3000/teams`);

  static teamApiToTeam({ id, name, logo }: TeamAPI): Team {
    return { id, name, img: logo };
  }

  static teamToTeamApi({ id, name, img }: Team): TeamAPI {
    return { id, name, logo: img };
  }

  static async getTeams({ page, limit, filter } : TeamsQuery): Promise<TeamsApi> {
    let queryString = "?filter=";
    if (filter) queryString += filter;
    if (page && limit) queryString += `&page=${page}&limit=${limit}`;
    const result = await axios.get(this.uri + queryString);

    return {
      total: result.data.total,
      teams: result.data.data.map(this.teamApiToTeam),
    };
  }

  static async getTeam(id: number): Promise<Team> {
    const result = await axios.get(`${this.uri}/${id}`);
    console.log('result', result, id)
    return this.teamApiToTeam(result.data);
  }

  static async updateTeam(teamId: number, newTeam: Team): Promise<void> {
    try {
      await axios.put(`${this.uri}/${teamId}`, this.teamToTeamApi(newTeam));
      // TODO: Error handling
    } catch (err) {
      console.log(err);
      throw new Error(this.responseError(err));
    }
  }

  static async addTeam(newTeam: Team): Promise<number | undefined> {
    try {
      const result = await axios.post(this.uri, this.teamToTeamApi(newTeam));
      return result?.data?.id;
    } catch (err) {
      // TODO: Error handling
      throw new Error(this.responseError(err));
    }
  }

  static responseError(error: AxiosError): string {
    const apiError = error?.response?.data as APIError;
    return apiError.error;
  }
}

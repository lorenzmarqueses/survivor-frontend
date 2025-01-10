import exp from "constants";

export interface AddSurvivorInputs {
  name: string;
  age: number;
  gender: string;
  latitude: number;
  longitude: number;
  infected: boolean;
}

export interface AddSurvivorResponse extends Survivor {}

export interface Survivor {
  id: string;
  name: string;
  age: number;
  gender: string;
  latitude: number;
  longitude: number;
  infected: boolean;
  createdAt: string;
}

export interface FetchSurvivorsResponse {
  data: FetchSurvivorsResponseData;
  total: number;
  page: number;
  limit: number;
}

export interface FetchSurvivorsResponseData {
  survivors: Survivor[];
  infectedCount: number;
  nonInfectedCount: number;
}

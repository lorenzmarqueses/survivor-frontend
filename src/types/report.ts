import { Survivor } from "./survivor";

export interface FetchInfectedReportResponse {
  value: number;
  percentage: number;
  trend: "UP" | "DOWN";
  report: FetchInfectedReport;
}

export interface FetchInfectedReport {
  infectedSurvivors: Survivor[];
  nonInfectedSurvivors: Survivor[];
}

export interface FetchNonInfectedReportResponse {
  value: number;
  percentage: number;
  trend: "UP" | "DOWN";
  report: FetchNonInfectedReport;
}

export interface FetchNonInfectedReport {
  infectedSurvivors: Survivor[];
  nonInfectedSurvivors: Survivor[];
}

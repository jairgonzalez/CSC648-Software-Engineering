export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  role: string;
}

export interface LoginTokenResponse extends RefreshTokenResponse {
  refresh_token: string;
}

export interface CovidRecordResponse {
  id: number;
  cases: number;
  deaths: number;
  icu: number;
  hosp: number;
  date: string;
}

export interface FireRecordResponse {
  id: number;
  start_date: string;
  end_date: string;
  aqi: number;
  EvacuationLevel: number;
  area: number;
  active: boolean;
  name: string;
}

export interface SubmittedRecordsResponse {
  covidRecords: CovidRecordResponse[];
  fireRecords: FireRecordResponse[];
}

export interface CountyRecord {
  id: string;
  name: string;
}

export interface UserRecord {
  access: string;
  county_id: number;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  passwordHash: string;
  phone: string;
}

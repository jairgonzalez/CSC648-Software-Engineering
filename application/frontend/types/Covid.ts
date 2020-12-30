import County from "./County";
interface Covid {
  id: number;
  cases: number;
  deaths?: number;
  icu?: number;
  hosp?: number;
  date?: string;
  approved: boolean;
  county?: County;
}

export default Covid;

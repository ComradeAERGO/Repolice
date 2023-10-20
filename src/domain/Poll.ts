export interface Poll {
  id: number;
  question: string;
  options: string[];
  active: boolean;
  endTime: number;
  creator: string;
  voteCounts: { [key: number]: number };
}

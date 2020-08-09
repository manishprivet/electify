export interface data {
  success: Boolean;
  candidates: {
    name: string;
    votes: number;
  }[];
  total_votes: number;
  voters_remaining: number;
  display_name: string;
  auth_type: string;
  expiration_time: number;
}

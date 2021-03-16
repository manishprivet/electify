/* eslint-disable camelcase */
export interface data {
  success?: boolean;
  candidates?: {
    name: string;
    votes: number;
  }[];
  total_votes?: number;
  voters_remaining?: number;
  display_name?: string;
  auth_type?: string;
  expiration_time?: number;
  election_id?: string;
  voters?: Array<Record<string, unknown>>;
  voted?: string[];
}

export interface voteInterface {
  cIndex?: number;
  authType: string;
  tokenId?: string;
  voterId?: string;
  voterSecret?: string;
}

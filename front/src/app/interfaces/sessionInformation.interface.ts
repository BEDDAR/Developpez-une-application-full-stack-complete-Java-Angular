import { Theme } from "./theme.interface";

export interface SessionInformation {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  admin: boolean
}

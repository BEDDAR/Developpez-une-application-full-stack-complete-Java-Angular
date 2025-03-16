import { Theme } from "./theme.interface";

export interface User {
  id: number;
  email: string;
  userName: string;
  admin: boolean;
  password: string;
  themes: Theme[];
  createdAt: Date;
  updatedAt?: Date;
}

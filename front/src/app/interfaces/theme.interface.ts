import { Article } from "./article.interface";
import { User } from "./user.interface";

export interface Theme {
  id: number;
  titre: string,
  description: string,
  abonnes: User[],
  articles: Article[]
}

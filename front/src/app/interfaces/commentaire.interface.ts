import { User } from "./user.interface";
import { Article } from "./article.interface"

export interface Commentaire {
  id: number;
  contenu: string;
  auteur: User;
  article: Article;
  createdAt: Date;
}

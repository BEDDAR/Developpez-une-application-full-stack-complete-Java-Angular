import { Theme } from "./theme.interface";
import { User } from "./user.interface";
import { Commentaire } from "./commentaire.interface"

export interface Article {
  id: number;
  titre: string;
  contenu: string;
  auteur: User;
  theme: Theme;
  commentaires: Commentaire;
  createdAt: Date;
}

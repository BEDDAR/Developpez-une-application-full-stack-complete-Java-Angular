import { Commentaire } from 'src/app/interfaces/commentaire.interface';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from '../interfaces/article.interface';

@Injectable({
  providedIn: "root"
})

export class CommentaireService {

  constructor(private httpClient: HttpClient) { }

  private pathService: string = "/api/commentaire"

  public envoyerCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    return this.httpClient.post<Commentaire>(this.pathService, commentaire)
  }

}

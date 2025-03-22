import { Article } from './../interfaces/article.interface';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})

export class ArticleService {

  private pathService: string = 'api/article';

  constructor(private htttpClient: HttpClient) { }

  public create(article: Article) {
    this.htttpClient.post(this.pathService, article)
  }

  public getarticles(): Observable<Article[]> {
    return this.htttpClient.get<Article[]>(this.pathService)
  }

public getArticle(id:string):Observable<Article>{
  return this.htttpClient.get<Article>(`${this.pathService}/${id}`)
}
}

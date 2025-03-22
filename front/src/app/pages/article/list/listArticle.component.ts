import { ArticleService } from './../../../services/article.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { Article } from './../../../interfaces/article.interface'

@Component({
  selector: 'app-home',
  templateUrl: './listArticle.component.html',
  styleUrls: ['./listArticlecomponent.scss'],
})
export class ArticleListComponent{

  public articles$: Observable < Article[] >= this.articleService.getarticles();

    constructor(
      private router: Router,
      private articleService: ArticleService) { }

  public navigate() {
  this.router.navigate(['/articles/create'])
}
}

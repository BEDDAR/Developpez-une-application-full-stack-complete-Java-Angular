import { ArticleService } from './../../../services/article.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { Article } from './../../../interfaces/article.interface';

@Component({
  selector: 'list-articles',
  templateUrl: './listArticle.component.html',
  styleUrls: ['./listArticlecomponent.scss'],
})
export class ArticleListComponent implements OnInit {

  private allArticles: Article[] = [];
  public articles$ = new BehaviorSubject<Article[]>([]);
  public triRecent:boolean=true;

  constructor(
    private router: Router,
    private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getarticles().subscribe(articles => {
      this.allArticles = articles;
      this.trierParPlusRecent(); // tri par défaut
    });
  }

  public navigate() {
    this.router.navigate(['/articles/create']);
  }

  public trierParPlusRecent(): void {
    const sorted = [...this.allArticles].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    this.articles$.next(sorted);
  }

  public trierParPlusAncien(): void {
    const sorted = [...this.allArticles].sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    this.articles$.next(sorted);
  }

  public toggleTri(): void {
    this.triRecent = !this.triRecent;
    if (this.triRecent) {
      this.trierParPlusRecent();
    } else {
      this.trierParPlusAncien();
    }
  }
}

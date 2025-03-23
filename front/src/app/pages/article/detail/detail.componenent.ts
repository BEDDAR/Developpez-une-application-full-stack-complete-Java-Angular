import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Article } from 'src/app/interfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './detail.componenet.html',
  styleUrls: ['./detail.componenent.scss'],
})
export class  ArticleDetailComponent implements OnInit{
private id_article :string|null =''
public article? : Article
  constructor(
    private router :ActivatedRoute,
  private articleService:ArticleService){}

public ngOnInit(): void {
  this.id_article = this.router.snapshot.paramMap.get('id');
  if(this.id_article)
  this.articleService.getArticle(this.id_article).subscribe((article)=>this.article=article)
}

}

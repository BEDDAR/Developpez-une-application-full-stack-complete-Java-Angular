import { SessionService } from './../../../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Article } from 'src/app/interfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Commentaire } from 'src/app/interfaces/commentaire.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { CommentaireService } from 'src/app/services/commentaire.service';

@Component({
  selector: 'app-home',
  templateUrl: './detail.componenet.html',
  styleUrls: ['./detail.componenent.scss'],
})
export class ArticleDetailComponent implements OnInit {
  private id_article: string | null = '';
  public article?: Article;
  public commentaireForm: FormGroup | undefined;
  public auteur?: User
  constructor(
    private router: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private userService: UserService,
    private commentaireService: CommentaireService) { }

  public ngOnInit(): void {
    this.id_article = this.router.snapshot.paramMap.get('id');
    if (this.id_article) {
      this.articleService.getArticle(this.id_article).subscribe((article) => this.article = article)
    }

    let auteur_id = this.sessionService.sessionInformation?.id
    if (auteur_id) {
      this.userService.getById(auteur_id.toString()).subscribe(user => {
        this.auteur = user;
      });
    }
  }

  public envoyer(): Observable<Commentaire> {
    let commentaire = this.commentaireForm?.value as Commentaire
    if (this.auteur) {
      commentaire.auteur = this.auteur;
    }

    if (this.article) {
      commentaire.article = this.article
    }
    return this.commentaireService.envoyerCommentaire(commentaire)

  }
  public initForm(commentaire: Commentaire) {
    this.commentaireForm = this.fb.group({
      commentaire: [commentaire ? commentaire.contenu : '']
    })
  }

}

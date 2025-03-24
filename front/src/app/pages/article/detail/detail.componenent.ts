import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from './../../../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Article } from 'src/app/interfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Commentaire } from 'src/app/interfaces/commentaire.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { CommentaireService } from 'src/app/services/commentaire.service';

@Component({
  selector: 'app-home',
  templateUrl: './detail.componenet.html',
  styleUrls: ['./detail.componenent.scss'],
  encapsulation: ViewEncapsulation.None
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
    private commentaireService: CommentaireService,
    private matSnackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.id_article = this.router.snapshot.paramMap.get('id');
    console.log("idArticle", this.id_article)
    if (this.id_article) {
      this.articleService.getArticle(this.id_article).subscribe((article) => this.article = article)
    }
    let auteur_id = this.sessionService.sessionInformation?.id
    if (auteur_id) {
      this.userService.getById(auteur_id.toString()).subscribe(user => {
        this.auteur = user;
      });
    }
    this.initForm()
  }

  public envoyer(): void {
    const commentaire = this.commentaireForm?.value as Commentaire
    if (this.auteur) {
      commentaire.auteur = this.auteur;
    }

    if (this.article) {
      console.log(this.article)
      commentaire.article = this.article
      this.commentaireService.envoyerCommentaire(commentaire)
        .subscribe((_) =>
          this.matSnackBar.open('Ton commentaire est bien enregistré', 'Close', { duration: 3000 }))
    }
  }

  public initForm(commentaire?: Commentaire): void {
    this.commentaireForm = this.fb.group({
      contenu: [commentaire ? commentaire.contenu : '']
    })
  }

}

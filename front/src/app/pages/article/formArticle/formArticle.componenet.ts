import { UserService } from './../../../services/user.service';
import { SessionService } from './../../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ThemeService } from './../../../services/theme.service';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/interfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './formArticle.componenet.html',
  styleUrls: ['./formArticle.componenet.scss'],
})
export class ArticleformComponent implements OnInit {
  public articleForm: FormGroup | undefined;
  public themes$: Observable<Theme[]> = this.themeService.all();
  private auteur: any;
  constructor(
    private themeService: ThemeService,
    private fb: FormBuilder,
    private artcileService: ArticleService,
    private sessionService: SessionService,
    private userService: UserService,
    private matSnackBar: MatSnackBar) {
    let auteur_id = this.sessionService.sessionInformation?.id
    if (auteur_id) {
      this.userService.getById(auteur_id.toString()).subscribe(user => {
        this.auteur = user;
      });
    }
  }

  public ngOnInit(): void {
    this.initForm()
  }

  public submit(): void {
    const article = this.articleForm?.value as Article
    article.auteur = this.auteur,
      console.log(article)
    this.artcileService.create(article)
      .subscribe((_) => this.matSnackBar.open('Article bien créé', 'Close', { duration: 3000 }))

  }

  public initForm(article?: Article): void {

    this.articleForm = this.fb.group({
      titre: [article ? article.titre : '',
      [Validators.required]
      ],
      contenu: [article ? article.contenu : '',
      [Validators.required]
      ],
      theme: [article ? article.theme : '',
      [Validators.required]
      ]
    })
  }
}

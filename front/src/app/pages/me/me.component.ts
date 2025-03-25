import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Theme } from 'src/app/interfaces/theme.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  public user: User | undefined;
  public formMe: FormGroup | undefined;
  public userThemesSet =new Set<Theme>();

  constructor(private router: Router,
    private sessionService: SessionService,
    private matSnackBar: MatSnackBar,
    private userService: UserService,
    private fb: FormBuilder,
  private themeService:ThemeService) {
  }

  public ngOnInit(): void {
    this.userService
      .getById(this.sessionService.sessionInformation!.id.toString())
      .subscribe((user: User) => {
        this.user = user;
        this.userThemesSet = new Set(user.themes);
        this.initForm();
      });
    ;
  }

  desabonner(theme: Theme): void {
    const idUser = this.sessionService.sessionInformation?.id;
    if (!idUser) return;

    this.userService.desabonner(idUser, theme).subscribe((_: User) => {
      this.userThemesSet.delete(theme); // Retire immédiatement du Set
      this.matSnackBar.open('Désabonnement réussi', 'Fermer', { duration: 3000 });
    });
  }

  public submit(): void {
    const user = this.formMe?.value as User;

    if (this.user) {
      this.userService.update(this.user?.id, user)
        .subscribe((_: User) => {
          this.matSnackBar.open("Tes nouvelles informations sont bien enregistrées !", 'Close', { duration: 3000 });
        })
    } else {
      this.matSnackBar.open("Echec d'enregistrement", 'Close', { duration: 3000 });
    }
  }

  initForm(): void {
    console.log(this.user)
    this.formMe = this.fb.group({
      userName: [this.user?.userName],
      email: [this.user?.email,
      [
        Validators.required,
        Validators.email
      ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.min(3)
        ]
      ]
    });
  }
}

import { Theme } from './../../interfaces/theme.interface';
import { UserService } from 'src/app/services/user.service';
import { Observable, map, of ,BehaviorSubject} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

@Component({
  selector: 'app-home',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeListComponent implements OnInit {

  public themes$: Observable<Theme[]> = this.themeService.all()
  private abonnementSubject = new BehaviorSubject<boolean>(false);
  constructor(
    private themeService: ThemeService,
    private userService: UserService,
    private sessionService: SessionService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.themes$)
  }

  abonner(theme: Theme) {
    console.log(this.sessionService.sessionInformation?.id, theme)
    let idUser = this.sessionService.sessionInformation?.id
    this.userService.update(idUser, theme)
      .subscribe((_: User) => this.matSnackBar.open('abonnement réussi', 'Close', { duration: 3000 }));
    console.log(this.sessionService.sessionInformation)
  }

  isAbonne(theme: Theme): Observable<boolean> {
    const idUser = this.sessionService.sessionInformation?.id;
    if (idUser) {
      this.userService.getById(idUser.toString()).subscribe(user => {
        const isSubscribed = user.themes.some(t => t.id === theme.id);
        this.abonnementSubject.next(isSubscribed);
      });
    } else {
      console.error("Identifiant utilisateur non trouvé.");
      this.abonnementSubject.next(false);
    }
    return this.abonnementSubject.asObservable();
  }

  desabonner(theme: Theme) {
    let idUser = this.sessionService.sessionInformation?.id
    this.userService.update(idUser, theme)
      .subscribe((_: User) => this.matSnackBar.open('désabonnement réussi', 'Close', { duration: 3000 }));
  }

}

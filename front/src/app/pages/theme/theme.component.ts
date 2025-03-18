import { Theme } from './../../interfaces/theme.interface';
import { UserService } from 'src/app/services/user.service';
import { Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeListComponent implements OnInit {
  public themes$: Observable<Theme[]> = this.themeService.all();
  public userThemesSet = new Set<number>(); // Stocke les IDs des thèmes abonnés

  constructor(
    private themeService: ThemeService,
    private userService: UserService,
    private sessionService: SessionService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idUser = this.sessionService.sessionInformation?.id;
    if (idUser) {
      this.userService.getById(idUser.toString()).subscribe(user => {
        this.userThemesSet = new Set(user.themes.map(t => t.id)); // Stocke les IDs des thèmes
      });
    }
  }

  checkAbonnement(theme: Theme): boolean {
    return this.userThemesSet.has(theme.id);
  }

  abonner(theme: Theme): void {
    const idUser = this.sessionService.sessionInformation?.id;
    if (!idUser) return;

    this.userService.update(idUser, theme).subscribe((_: User) => {
      this.userThemesSet.add(theme.id); // Ajoute immédiatement dans le Set
      this.matSnackBar.open('Abonnement réussi', 'Fermer', { duration: 3000 });
    });
  }

  desabonner(theme: Theme): void {
    const idUser = this.sessionService.sessionInformation?.id;
    if (!idUser) return;

    this.userService.desabonner(idUser, theme).subscribe((_: User) => {
      this.userThemesSet.delete(theme.id); // Retire immédiatement du Set
      this.matSnackBar.open('Désabonnement réussi', 'Fermer', { duration: 3000 });
    });
  }
}

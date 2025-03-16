import { Theme } from './../../interfaces/theme.interface';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/interfaces/user.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

@Component({
  selector: 'app-home',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeListComponent implements OnInit {

  public themes$: Observable<Theme[]> = this.themeService.all()
  constructor(private themeService: ThemeService, private userService: UserService, private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    console.log(this.themes$)
  }

  abonner(theme: Theme): void {
    // Vérifier si la session et la liste des thèmes existent
    if (this.sessionService.sessionInformation?.themes) {
      // Créer une copie du tableau de thèmes et ajouter le nouveau thème
      const updatedThemes = [...this.sessionService.sessionInformation.themes, theme];

      // Mettre à jour la session avec la nouvelle liste de thèmes
      const updatedSession = {
        ...this.sessionService.sessionInformation,
        themes: updatedThemes,
      };

      // Envoyer la mise à jour au backend
      this.userService.update(updatedSession).subscribe({
        next: (newSession) => {
          // Mettre à jour la session locale avec les nouvelles informations
          this.sessionService.sessionInformation = newSession;
          console.log('Session mise à jour avec succès', newSession);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la session', err);
          // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
        },
      });
    } else {
      console.error('La session ou la liste des thèmes est introuvable');
    }
  }

}



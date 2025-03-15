import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './pages/auth/services/auth.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHomePage: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService) {
  }


  ngOnInit() {
    // Vérifier la route actuelle lors de l'initialisation
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/'; // La route d'accueil est '/'
    });
  }

  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }
}

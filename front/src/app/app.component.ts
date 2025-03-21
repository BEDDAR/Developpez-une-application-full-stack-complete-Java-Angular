import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHomePage: boolean = false;
  isLogged$: Observable<boolean> = of(false);
  constructor(
    private router: Router,
    private sessionService: SessionService) {
  }


  ngOnInit() {
    // Vérifier la route actuelle lors de l'initialisation
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/'; // La route d'accueil est '/'
    });
    this.isLogged$ = this.$isLogged();
  }

  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }
}

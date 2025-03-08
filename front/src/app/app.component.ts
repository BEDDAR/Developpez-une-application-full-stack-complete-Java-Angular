import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Vérifier la route actuelle lors de l'initialisation
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/'; // La route d'accueil est '/'
    });
  }
}

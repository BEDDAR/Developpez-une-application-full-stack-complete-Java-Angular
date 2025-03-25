import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { SessionService } from './services/session.service';
import { NgModule, Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/componenent/login/login.component'
import { RegisterComponent } from './pages/auth/componenent/register/register.componenet';
import { ThemeListComponent } from './pages/theme/theme.component';
import { ArticleListComponent } from './pages/article/list/listArticle.component'
import { ArticleformComponent } from './pages/article/formArticle/formArticle.componenet'
import { ArticleDetailComponent } from './pages/article/detail/detail.componenent'
import { MeComponent } from './components/me/me.component';
import { NotFoundComponent } from './pages/notFound/notFound.component'

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'themes', component: ThemeListComponent },
{ path: 'articles', component: ArticleListComponent },
{ path: 'articles/create', component: ArticleformComponent },
{ path: 'article/:id', component: ArticleDetailComponent },
{ path: 'me', component: MeComponent },
{path:'404',component:NotFoundComponent},
{path:'**',redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

  constructor(private router:Router,
    private sessionService:SessionService
  ){}

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }
 }

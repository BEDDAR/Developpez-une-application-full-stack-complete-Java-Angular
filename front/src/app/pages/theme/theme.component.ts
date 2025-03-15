import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeListComponent implements OnInit {

  public themes$ : Observable<Theme[]>= this.themeService.all()
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    console.log(this.themes$)
  }

}

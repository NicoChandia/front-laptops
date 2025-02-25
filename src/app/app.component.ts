import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, CommonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  

}

import { Component } from '@angular/core';
import { SharedModule } from '../../shareModules';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-back-router',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './back-router.component.html',
  styleUrl: './back-router.component.scss'
})
export class BackRouterComponent {

}

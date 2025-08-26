import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InscriptionPage } from './features/inscription-page/inscription-page';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    InscriptionPage
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'new-features';
}

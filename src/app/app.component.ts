import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Sócio Torcedor Cruzeiro';

  constructor(private router: Router) {}

  // exibindoNavbar() {
  //   return (
  //     this.router.url !== '/login' &&
  //     this.router.url !== '/cadastro' &&
  //     this.router.url !== '/prova-de-vida' &&
  //     this.router.url !== '/enviar-documento-frente' &&
  //     this.router.url !== '/enviar-documento-verso'
  //   );
  // }
}

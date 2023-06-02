import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userLogado = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.verificarSeUsuarioLogado();
  }

  verificarSeUsuarioLogado() {
    if (localStorage.getItem('usuario')) {
      this.userLogado = true;
    }
  }

  serSocio() {
    if (this.userLogado == true) {
      this.router.navigate(['/tipo-socio']);
    } else {
      this.router.navigate(['/enviar-documento-frente']);
    }
  }
}

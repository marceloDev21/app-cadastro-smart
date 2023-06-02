import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FaceAutoCaptureService } from 'src/app/components/dis/face-auto-capture/face-auto-capture.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];

  isLogado = false;

  constructor(
    private router: Router,
    private faceAutoCaptureService: FaceAutoCaptureService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('usuario')) {
      this.isLogado = true;
      this.getItensMenuLogado();
    } else {
      this.isLogado = false;
      this.getItensMenuNaoLogado();
    }
  }

  getItensMenuNaoLogado() {
    this.items = [
      {
        label: 'Início',
        routerLink: '/',
      },
      {
        label: 'Cadastro',
        routerLink: '/enviar-documento-frente',
      },
      {
        label: 'Login',
        routerLink: '/login',
      },
    ];
  }

  getItensMenuLogado() {
    this.items = [
      {
        label: 'Início',
        routerLink: '/',
      },
      {
        label: 'Planos',
        routerLink: '/tipo-socio',
      },
      // {
      //   label: 'Sair',
      //   command() {
      //     localStorage.clear();
      //     window.location.href = '/login';
      //   },
      // },
    ];
  }

  logout() {
    this.isLogado = false;
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
      localStorage.clear();
    });
  }
}

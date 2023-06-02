import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoginService } from './login.service';
import { cpf } from 'cpf-cnpj-validator';
import { Documento } from 'src/app/models/documento';
import { FaceAutoCaptureService } from 'src/app/components/dis/face-auto-capture/face-auto-capture.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  cpf!: '';
  documento = new Documento();

  displayBasic!: boolean;

  cpfValidado!: boolean;

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private faceAutoCaptureService: FaceAutoCaptureService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  async voltarParaInicio() {
    localStorage.clear();
    await this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  async Login(cpf: any) {
    if (cpf !== undefined) {
      // cpf = this.cpf.replace('.', '');
      // cpf = this.cpf.replace('.', '');
      // cpf = this.cpf.replace('-', '');
      await this.loginService.usuarioPorCpf(cpf).subscribe(
        (response) => {
          this.faceAutoCaptureService.cpf = response.cpf;

          this.documento.image.data = response.documentoRetrato;
          this.router.navigate(['/prova-de-vida']);
        },
        (erro) => {
          if (erro.status === 500) {
            this.messageService.add({
              key: 'bc',
              severity: 'error',
              summary: 'Erro no Login',
              detail: 'Estamos enfrentando algum problema',
            });
          } else if (erro.status === 404) {
            this.messageService.add({
              key: 'bc',
              severity: 'error',
              summary: 'Erro no Login',
              detail: 'Usuário não cadastrado',
            });
          } else if (erro.status !== null) {
            this.messageService.add({
              key: 'bc',
              severity: 'error',
              summary: 'Erro no Login',
              detail: 'Erro!',
            });
          }
        }
      );
    }
    if (this.cpfValidado === false) {
      this.messageService.add({
        key: 'bc',
        severity: 'error',
        summary: 'CPF Inválido',
        detail: 'Verifique os campos de CPF e tente novamente.',
      });
    }
  }

  validateCpf(event: Event) {
    const CPF = (event.target as HTMLInputElement).value;
    // console.log('CPF', CPF);
    if (cpf.isValid(CPF)) {
      // console.log('CPF válido');
      this.cpfValidado = true;
    } else {
      // console.log('CPF inválido');
      this.cpfValidado = false;
    }
  }
}

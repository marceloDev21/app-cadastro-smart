import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, ReplaySubject } from 'rxjs';
import { OnPhotoTakenEventValue, Step } from 'src/app/types';
import { CreateFaces } from './../../../models/response/prova-vida/body/create-faces';
import { FaceSimilarity } from './../../../models/response/prova-vida/body/face-similarity';
import { Usuario } from './../../../models/usuario';

import * as uuid from 'uuid';

import { FaceAutoCaptureService } from './face-auto-capture.service';

@Component({
  selector: 'app-face-auto-capture',
  templateUrl: './face-auto-capture.component.html',
  styleUrls: ['./face-auto-capture.component.css'],
  providers: [MessageService],
})
export class FaceAutoCaptureComponent {
  @Output() onPhotoTaken = new EventEmitter<OnPhotoTakenEventValue>();
  @Output() onError = new EventEmitter<Error>();
  @Output() onBack = new EventEmitter<Step>();

  isCadastro = true;
  usuarios: Usuario[] = new Array<Usuario>();
  probeFaceid: any;
  constructor(
    private faceAutoCaptureService: FaceAutoCaptureService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async ngOnInit() {
    //Se o atributo Usuario da service estiver preenchido está vindo da tela de cadastro
    if (this.faceAutoCaptureService.usuario.nome !== '') {
      //Instanciando class body para criar a primeira face do faceSimilarity
      let createface = new CreateFaces();
      //passando a imagem como atributo da classe
      createface.image.data =
        this.faceAutoCaptureService.usuario.documentoRetrato;
      //Chamda post para criar a primeira face do faceSimilarity
      const probeFaceSonda =
        this.faceAutoCaptureService.createfaces(createface);
      let probeFace: any = await probeFaceSonda.toPromise();
      //Armazenando valor retornado que será passado na url do faceSimilarity
      this.probeFaceid = probeFace.id;
    } else {
      //Se não estiver preenchido get em usuário para listar e compararmos com a prova de vida
      this.faceAutoCaptureService.getUsusarios().subscribe((usuarios) => {
        this.usuarios = usuarios;
        this.isCadastro = false;
      });
    }
  }

  async handlePhotoTaken({ image, data }: OnPhotoTakenEventValue) {
    this.onPhotoTaken.emit({ image, data });
    //Função que converte imagem para base64
    this.convertFile(image).subscribe(async (base64) => {
      //Verifica se é um cadastro ou uma analise para abrir a porta
      if (!this.isCadastro) {
        //Se não for um cadastro
        //Verifica se há registro de usuários
        if (this.usuarios.length > 0) {
          //Percorre a lista de usuários para recuperar o retrato salvo do documento
          // passar a mesma como atributo na chamda post para criar a primeira face do faceSimilarity
          this.usuarios.forEach(async (u) => {
            //Instanciando class body para criar a primeira face do faceSimilarity
            let createface = new CreateFaces();
            //passando a imagem como atributo da classe
            createface.image.data = u.documentoRetrato;
            const probeFaceSonda =
              this.faceAutoCaptureService.createfaces(createface);
            let probeFace: any = await probeFaceSonda
              .toPromise()
              .catch((erro) => {
                if (erro.status === 500) {
                  this.messageService.add({
                    key: 'bc',
                    severity: 'error',
                    summary: 'Erro no Login',
                    detail: 'Tente novamente!',
                  });
                  setTimeout(async () => {
                    this.router.navigate(['/login']).then(() => {
                      window.location.reload();
                    });
                  }, 2500);
                }
              });
            //Armazenando valor retornado que será passado na url do faceSimilarity
            this.probeFaceid = probeFace.id;
            console.log(this.probeFaceid);

            //Instanciando class body para criar a segunda face do faceSimilarity
            createface = new CreateFaces();
            //passando a imagem como atributo da classe
            createface.image.data = base64;
            const referenceFace =
              this.faceAutoCaptureService.createfaces(createface);
            let faceCreated: any = await referenceFace.toPromise();
            //Armazenando valor retornado que será passado no body do faceSimilarity
            let referenceFaceId = faceCreated.id;

            console.log(referenceFaceId);
            //Chamada do face similarity para comparação de faces
            let faceSimilarity = new FaceSimilarity();
            faceSimilarity.referenceFace = '/api/v1/faces/' + referenceFaceId;
            const probeFaceSimilarity =
              this.faceAutoCaptureService.faceSimilarity(
                this.probeFaceid,
                faceSimilarity
              );

            let resultado = await probeFaceSimilarity
              .toPromise()
              .catch((erro) => {
                if (
                  erro.status === 500 ||
                  erro.status === 400 ||
                  erro.status === 429
                ) {
                  this.messageService.add({
                    key: 'bc',
                    severity: 'error',
                    summary: 'Erro no Login',
                    detail: 'Tente novamente em alguns minutos!',
                  });
                  setTimeout(async () => {
                    this.router.navigate(['/login']).then(() => {
                      window.location.reload();
                    });
                  }, 2500);
                }
              });
            console.log(resultado);

            if (!localStorage.getItem('usuario')) {
              if (resultado.score > 0.4) {
                // login usuario
                let cpf;
                cpf = this.faceAutoCaptureService.cpf;

                cpf = uuid.v4();

                console.log(`Id: ${cpf}`);

                localStorage.setItem('usuario', cpf);

                if (localStorage.getItem('usuario')) {
                  this.faceAutoCaptureService.mostrarMenuEmitter.emit(true);
                  setTimeout(() => {
                    this.router.navigate(['/']).then(() => {
                      window.location.reload();
                    });
                  }, 2500);
                  this.messageService.add({
                    key: 'bc',
                    severity: 'success', //'success', 'info', 'warn', 'error'
                    summary: 'Bem vindo!',
                    detail: 'Login realizado!',
                  });
                  return;
                } else {
                  this.messageService.add({
                    key: 'bc',
                    severity: 'warn', //'success', 'info', 'warn', 'error'
                    summary: 'Ops :!',
                    detail: 'Registro não encontrado!',
                  });
                  setTimeout(() => {
                    this.router.navigate(['/login']).then(() => {
                      // window.location.reload();
                    });
                  }, 2000);
                }
              } else {
                this.messageService.add({
                  key: 'bc',
                  severity: 'warn', //'success', 'info', 'warn', 'error'
                  summary: 'Ops :!',
                  detail: 'Registro não encontrado!',
                });
                setTimeout(() => {
                  this.router.navigate(['/login']).then(() => {
                    localStorage.clear();
                    // window.location.reload();
                  });
                }, 2000);
                return;
              }
            }

            //selecionar socio
            if (localStorage.getItem('usuario')) {
              if (localStorage.getItem('plano')) {
                const socioTorcedor =
                  this.faceAutoCaptureService.planoSocioTorcedor;
                console.log('plano: ', socioTorcedor);
                if (resultado.score > 0.4) {
                  if (socioTorcedor == 1) {
                    console.log(socioTorcedor);
                    this.messageService.add({
                      key: 'bc',
                      severity: 'success', //'success', 'info', 'warn', 'error'
                      summary: 'Sócio',
                      detail: 'Parabéns, agora você é Sócio Time do povo',
                    });
                    setTimeout(() => {
                      this.router.navigate(['/']);
                      localStorage.removeItem('plano');
                    }, 2000);
                    return;
                  }
                  if (socioTorcedor == 2) {
                    console.log(socioTorcedor);
                    this.messageService.add({
                      key: 'bc',
                      severity: 'success', //'success', 'info', 'warn', 'error'
                      summary: 'Sócio',
                      detail: 'Parabéns, agora você é Sócio Cruzeiro sempre',
                    });
                    setTimeout(() => {
                      this.router.navigate(['/']);
                      localStorage.removeItem('plano');
                    }, 2000);
                    return;
                  }
                } else {
                  this.messageService.add({
                    key: 'bc',
                    severity: 'warn', //'success', 'info', 'warn', 'error'
                    summary: 'ERRO:!',
                    detail: 'Análise facial não corresponde. Tente novamente!',
                  });
                  setTimeout(() => {
                    this.router.navigate(['/plano']).then(() => {
                      // window.location.reload();
                    });
                  }, 2000);
                  return;
                }
              } else {
                this.messageService.add({
                  key: 'bc',
                  severity: 'warn', //'success', 'info', 'warn', 'error'
                  summary: 'Ops :!',
                  detail: 'Registro não encontrado!',
                });
                setTimeout(() => {
                  this.router.navigate(['/login']).then(() => {
                    // window.location.reload();
                  });
                }, 2000);
                return;
              }
            }
          });
        } else {
          this.messageService.add({
            key: 'bc',
            severity: 'warn', //'success', 'info', 'warn', 'error'
            summary: 'Ops :!',
            detail: 'Registro não encontrado!',
          });
          setTimeout(async () => {
            await this.router.navigate(['/']).then(() => {
              return window.location.reload();
            });
          }, 2000);
          return;
        }
      } else {
        // inserir usuario
        let createface = new CreateFaces();
        createface.image.data = base64;
        const referenceFace =
          this.faceAutoCaptureService.createfaces(createface);
        let faceCreated: any = await referenceFace.toPromise();
        let referenceFaceId = faceCreated.id;

        console.log(referenceFaceId);

        let faceSimilarity = new FaceSimilarity();

        faceSimilarity.referenceFace = '/api/v1/faces/' + referenceFaceId;
        const probeFaceSimilarity = this.faceAutoCaptureService.faceSimilarity(
          this.probeFaceid,
          faceSimilarity
        );

        let score = await probeFaceSimilarity.toPromise();
        console.log(score);
        if (score.score > 0.4) {
          this.faceAutoCaptureService
            .inserirUsuario(this.faceAutoCaptureService.usuario)
            .subscribe((usuario) => {
              console.log('usuario inserido');

              this.messageService.add({
                key: 'bc',
                severity: 'success', //'success', 'info', 'warn', 'error'
                summary: 'Bem vindo!',
                detail: 'Usuário registrado com sucesso!',
              });
              setTimeout(() => {
                this.router.navigate(['/login']).then(() => {
                  window.location.reload();
                });
              }, 2000);
            });
          return;
        } else {
          setTimeout(() => {
            this.messageService.add({
              key: 'bc',
              severity: 'error', //'success', 'info', 'warn', 'error'
              summary: 'Atenção!',
              detail: 'Não conseguimos fazer a identificação!',
            });
            this.router.navigate(['/']);
          }, 2000);
          return;
        }
      }
    });
  }

  handleError(error: Error) {
    this.onError.emit(error);
  }

  convertFile(file: any): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(reader.result!.toString()));
    return result;
  }
}

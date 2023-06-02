import { Component, OnInit } from '@angular/core';

import { ResponseDocument } from '../models/response/documento/response-document';
import { DadosDocumentoService } from './dados-documento.service';

import { Router } from '@angular/router';

import { Usuario } from '../models/usuario';
import { FaceAutoCaptureService } from '../components/dis/face-auto-capture/face-auto-capture.service';
import { DocumentAutoCaptureService } from '../components/dis/document-auto-capture/document-auto-capture.service';

import { MessageService } from 'primeng/api';
import { WatchListMember } from '../models/SmartFace/watchListMember';
import { WatchLists } from '../models/SmartFace/watchlists';
import { Items } from '../models/SmartFace/items';
import { Images } from '../models/SmartFace/Images';
@Component({
  selector: 'app-dados-documento',
  templateUrl: './dados-documento.component.html',
  styleUrls: ['./dados-documento.component.css'],
  providers: [MessageService]
})
export class DadosDocumentoComponent implements OnInit {
  dadosDocumento = new ResponseDocument();
  usuario = new Usuario();

  watchListMember = new WatchListMember();
  watchListsResponse = new WatchLists();

  lista: Items[] = new Array<Items>();

  listas!: Items[];

  lists = new Items();

  images = new Array<Images>();

  constructor(
    private dadosDocumentoService: DadosDocumentoService,
    private documentoAutoCaptureService: DocumentAutoCaptureService,
    private faceAutoCaptureService: FaceAutoCaptureService,
    private messageService: MessageService,

    private router: Router
  ) {}

  async ngOnInit() {

    this.watchListss();
    this.dadosDocumento = new ResponseDocument();

    this.dadosDocumento = this.dadosDocumentoService.getDadosDocumento();
    if (
      this.dadosDocumento !== undefined &&
      this.dadosDocumento.hasOwnProperty('customer') &&
      this.dadosDocumento.customer.hasOwnProperty('document')
    ) {
      if (
        this.dadosDocumento!.customer.hasOwnProperty('fullName') &&
        this.dadosDocumento!.customer.fullName.hasOwnProperty('visualZone')
      ) {
        this.usuario.nome = this.dadosDocumento!.customer.fullName.visualZone;
      }
      if (
        this.dadosDocumento!.customer.hasOwnProperty('dateOfBirth') &&
        this.dadosDocumento!.customer.dateOfBirth.hasOwnProperty('visualZone')
      ) {
        this.usuario.dataNascimento =
          this.dadosDocumento.customer.dateOfBirth.visualZone;
      }
      if (
        this.dadosDocumento !== undefined &&
        this.dadosDocumento.customer.document.hasOwnProperty('additionalTexts')
      ) {
        if (
          this.dadosDocumento!.customer.document.additionalTexts.hasOwnProperty(
            'fathersName'
          ) &&
          this.dadosDocumento!.customer.document.additionalTexts.fathersName.hasOwnProperty(
            'visualZone'
          )
        ) {
          this.usuario.nomePai =
            this.dadosDocumento.customer.document.additionalTexts.fathersName.visualZone.replace(
              '\n',
              ' '
            );
        }

        if (
          this.dadosDocumento!.customer.document.additionalTexts.hasOwnProperty(
            'mothersName'
          ) &&
          this.dadosDocumento!.customer.document.additionalTexts.mothersName.hasOwnProperty(
            'visualZone'
          )
        ) {
          this.usuario.nomeMae =
            this.dadosDocumento.customer.document.additionalTexts.mothersName.visualZone.replace(
              '\n',
              ' '
            );
        }
        if (
          this.dadosDocumento!.customer.document.additionalTexts.hasOwnProperty(
            'taxNo'
          ) &&
          this.dadosDocumento!.customer.document.additionalTexts.taxNo.hasOwnProperty(
            'visualZone'
          )
        ) {
          this.usuario.cpf =
            this.dadosDocumento.customer.document.additionalTexts.taxNo.visualZone;
        }
        if (
          this.dadosDocumento!.customer.document.additionalTexts.hasOwnProperty(
            'dateOfFirstIteration'
          ) &&
          this.dadosDocumento!.customer.document.additionalTexts.dateOfFirstIteration.hasOwnProperty(
            'visualZone'
          )
        ) {
          this.usuario.dataExpedicao =
            this.dadosDocumento.customer.document.additionalTexts.dateOfFirstIteration.visualZone;
        }
        //this.usuario.naturalidade       =   this.dadosDocumento.customer..visualZone

        if (
          this.dadosDocumento!.customer.document.additionalTexts.hasOwnProperty(
            'drivingCategories'
          ) &&
          this.dadosDocumento!.customer.document.additionalTexts.drivingCategories.hasOwnProperty(
            'visualZone'
          )
        ) {
          this.usuario.categoriaHabilitacao =
            this.dadosDocumento.customer.document.additionalTexts.drivingCategories!.visualZone;
        }

        if (
          this.dadosDocumento!.customer.document.additionalTexts.hasOwnProperty(
            'dateOfFirstIteration'
          ) &&
          this.dadosDocumento!.customer.document.additionalTexts.dateOfFirstIteration.hasOwnProperty(
            'visualZone'
          )
        ) {
          this.usuario.dataEmissao =
            this.dadosDocumento.customer.document.additionalTexts.dateOfFirstIteration.visualZone;
        }

        if (
          this.dadosDocumento!.customer.document.hasOwnProperty(
            'documentNumber'
          ) &&
          this.dadosDocumento!.customer.document.documentNumber.hasOwnProperty(
            'visualZone'
          )
        ) {
          this.usuario.registro =
            this.dadosDocumento.customer.document.documentNumber.visualZone;
        }
        if (
          this.dadosDocumento!.customer.document.hasOwnProperty(
            'dateOfExpiry'
          ) &&
          this.dadosDocumento!.customer.document.dateOfExpiry.hasOwnProperty(
            'visualZone'
          )
        ) {
          this.usuario.dataValidade =
            this.dadosDocumento.customer.document.dateOfExpiry.visualZone;
        }

        if (this.dadosDocumento.customer.document.hasOwnProperty('links')) {
          if (
            this.dadosDocumento.customer.document.links.hasOwnProperty('pages')
          ) {
            if (
              this.dadosDocumento.customer.document.links.pages.hasOwnProperty(
                'front'
              )
            ) {
              this.usuario.documentoFrente = await this.getBase64Documento(
                this.dadosDocumento.customer.document.links.pages.front
              );
            }
            if (
              this.dadosDocumento.customer.document.links.pages.hasOwnProperty(
                'back'
              )
            ) {
              this.usuario.documentoVerso = await this.getBase64Documento(
                this.dadosDocumento.customer.document.links.pages.back
              );
            }
          }
          if (
            this.dadosDocumento.customer.document.links.hasOwnProperty(
              'portrait'
            )
          ) {
            this.usuario.documentoRetrato = await this.getBase64Documento(
              this.dadosDocumento.customer.document.links.portrait
            );
          }
          if (
            this.dadosDocumento.customer.document.links.hasOwnProperty(
              'signature'
            )
          ) {
            this.usuario.documentoAssinatura = await this.getBase64Documento(
              this.dadosDocumento.customer.document.links.signature
            );
          }
        }
      }

      if (this.dadosDocumento.customer.hasOwnProperty('personalNumber')) {
        let identidade =
          this.dadosDocumento.customer.personalNumber.visualZone.split(' ');
        this.usuario.documentoIdentidade = identidade[0];

        this.usuario.orgaoEmissor = identidade[1];
        this.usuario.estadoEmissor = identidade[2];
      }
    }
  }

  async getBase64Documento(url: string) {
    let a = this.documentoAutoCaptureService.getDadosDocumento(url);
    let b: any = await a.toPromise();

    return b.data;
  }

  provarVida() {
    this.faceAutoCaptureService.usuario = this.usuario;
    this.router.navigate(['prova-de-vida']);
  }

  async voltarParaInicio() {
    localStorage.clear();
    await this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

//Inserir na WatchList do Smart Faces
  criarWatchListMember() {

    this.watchListMember.displayName = this.usuario.nome;
    this.watchListMember.fullName = this.usuario.nome;
    console.log(this.usuario.nome);

    this.watchListMember.watchlistIds = [this.lists.id];
    console.log(this.lists.displayName)



    let img = new Images();
    img.data = this.usuario.documentoRetrato;

    this.watchListMember.images.push(img);

    this.dadosDocumentoService
      .createMember(this.watchListMember)
      .subscribe((criar:any) => {

        if (criar != null) {
          console.log(criar)
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso !',
            detail: 'Usuário cadastrado com sucesso',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro no cadastro :(',
          });
        }
      });
  }

  watchListss(){
    this.dadosDocumentoService.getLists().subscribe((wactchlist)=>{
      this.watchListsResponse = { ...wactchlist};
      this.lista = this.watchListsResponse.items;
      console.log(wactchlist)
    })
  }


}

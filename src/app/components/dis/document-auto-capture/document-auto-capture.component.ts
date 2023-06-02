import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { Base64 } from 'src/app/models/base64';
import { Documento } from 'src/app/models/documento';
import { OnPhotoTakenEventValue, Step } from 'src/app/types';
import { DocumentAutoCaptureService } from './document-auto-capture.service';
import { DadosDocumentoService } from 'src/app/dados-documento/dados-documento.service';
import { ResponseDocument } from 'src/app/models/response/documento/response-document';

@Component({
  selector: 'app-document-auto-capture',
  templateUrl: './document-auto-capture.component.html',
  styleUrls: ['./document-auto-capture.component.css'],
})
export class DocumentAutoCaptureComponent implements OnInit {
  @Output() onPhotoTaken = new EventEmitter<OnPhotoTakenEventValue>();
  @Output() onError = new EventEmitter<Error>();
  @Output() onBack = new EventEmitter<Step>();

  isButtonDisabled = true;
  detectar: any;

  base64 = new Base64();
  documento = new Documento();

  responseDocumento!: ResponseDocument;

  constructor(
    private documentAutoCaptureService: DocumentAutoCaptureService,
    private dadosDocumentoService: DadosDocumentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      localStorage.getItem('tipo') == null ||
      localStorage.getItem('tipo') == 'frente'
    ) {
      this.detectar = 'frente';
    } else {
      this.detectar = 'verso';
    }
    console.log(localStorage.getItem('custoumerid'));
  }

  async voltarParaInicio() {
    window.location.href = '/';
    await localStorage.clear();
  }

  async getCreateCustomers() {
    const customer: Observable<any> =
      this.documentAutoCaptureService.createCustomers();
    let custoumer: any = await customer.toPromise();
    localStorage.setItem('custoumerid', custoumer.id);
  }

  async getCreateDocument() {
    let custoumerid = String(localStorage.getItem('custoumerid'));
    const document: Observable<any> =
      this.documentAutoCaptureService.createDocument(custoumerid);
    await document.toPromise();
  }

  async handlePhotoTaken({ image, data }: OnPhotoTakenEventValue) {
    this.onPhotoTaken.emit({ image, data });

    if (this.detectar !== 'verso') {
      await this.getCreateCustomers();
      await this.getCreateDocument();
      await this.dadosDocumento(image);
    }

    if (this.detectar !== 'verso') {
      setTimeout(() => {
        this.router.navigate(['enviar-documento-verso']).then(() => {
          this.documentAutoCaptureService.setTipo('verso');
          localStorage.setItem('tipo', 'verso');
          window.location.reload();
        });
      }, 1000);
    }

    if (this.detectar === 'verso') {
      await this.dadosDocumento(image);
    }
  }

  async dadosDocumento(image: any) {
    this.convertFile(image).subscribe(async (base64) => {
      let custoumerid = String(localStorage.getItem('custoumerid'));
      console.log(custoumerid);
      if (custoumerid === null || custoumerid === '') {
        console.log('Deu ruim...');
        localStorage.clear();
        return;
      }
      this.base64.dataFront = base64;

      if (
        this.detectar === '' ||
        this.detectar === undefined ||
        this.detectar == 'frente'
      ) {
        console.log('frente');
        this.documento.advice.classification.pageTypes = ['front'];
      } else {
        console.log('back');
        this.documento.advice.classification.pageTypes = ['back'];
      }
      this.documento.image.data = base64;

      const createDocumentPages: Observable<any> =
        this.documentAutoCaptureService.createDocumentPages(
          this.documento,
          custoumerid
        );
      await createDocumentPages.toPromise();

      if (this.detectar === 'verso') {
        await this.getDadosDocumento();
        localStorage.removeItem('custoumerid');
        localStorage.removeItem('tipo');

        setTimeout(() => {
          this.router.navigate(['conferir-dados-documento']);
        }, 1000);
      }
    });
  }

  async getDadosDocumento() {
    let custoumerid = String(localStorage.getItem('custoumerid'));
    const document: Observable<any> =
      this.documentAutoCaptureService.getCustoumers(custoumerid);
    this.responseDocumento = await document.toPromise();
    this.dadosDocumentoService.setDadosDocumento(this.responseDocumento);
    console.log(this.responseDocumento);
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

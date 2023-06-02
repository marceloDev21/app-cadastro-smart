import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Documento } from 'src/app/models/documento';

@Injectable({
  providedIn: 'root',
})
export class DocumentAutoCaptureService {
  tipo = '';
  custoumerid = '';
  baseURL = '';
  constructor(private httpClient: HttpClient) {
    this.baseURL = `${environment.url}/innovatrics`;
  }

  createCustomers(): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/create-custoumers`, null);
  }

  createDocument(customerid: string): Observable<any> {
    return this.httpClient.put<any>(
      `${this.baseURL}/create-document?customerid=${customerid}`,
      null
    );
  }

  createDocumentPages(
    documento: Documento,
    customerid: string
  ): Observable<any> {
    return this.httpClient.put<any>(
      `${this.baseURL}/create-document-pages?customerid=${customerid}`,
      documento
    );
  }

  getCustoumers(custoumerid: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseURL}/get-customers?custoumerid=${custoumerid}`
    );
  }

  getDadosDocumento(baseurl: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseURL}/get-dados-documento?baseurl=${baseurl}`
    );
  }

  setTipo(tipo: string) {
    this.tipo = tipo;
  }

  getTipo() {
    return this.tipo;
  }

  setCustoumerid(custoumerid: string) {
    this.custoumerid = custoumerid;
  }

  getCustoumerid() {
    return this.custoumerid;
  }
}

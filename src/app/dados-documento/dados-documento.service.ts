import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ResponseDocument } from '../models/response/documento/response-document';
import { Usuario } from '../models/usuario';
import { WatchListMember } from '../models/SmartFace/watchListMember';
import { WatchLists } from '../models/SmartFace/watchlists';

@Injectable({
  providedIn: 'root',
})
export class DadosDocumentoService {
  responseDocument!: ResponseDocument;

  baseURL = ''
  constructor(private http: HttpClient) {
    this.baseURL = `${environment.url}/innovatrics`;
  }

  setDadosDocumento(dadosDocumento: ResponseDocument) {
    this.responseDocument = dadosDocumento;
  }

  getDadosDocumento() {
    return this.responseDocument;
  }

  createMember(watchList: WatchListMember){
    return this.http.post<any>(
      `${this.baseURL}/watchlist-members`,
      watchList);
  }

  getLists(){
    return this.http.get<WatchLists>(`${this.baseURL}/lists`)
  }

}

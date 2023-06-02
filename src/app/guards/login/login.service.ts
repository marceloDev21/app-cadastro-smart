import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {


  urlApi = '';
  urlApiUsuario = '';

  constructor(private http: HttpClient) {
    this.urlApi = `${environment.url}/ocr`;
    this.urlApiUsuario = `${environment.url}/usuario`;
  }

  usuarioPorCpf(cpf: String): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlApiUsuario}/cpf?cpf=${cpf}`);
  }
}

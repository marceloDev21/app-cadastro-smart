import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateFaces } from './../../../models/response/prova-vida/body/create-faces';
import { FaceSimilarity } from './../../../models/response/prova-vida/body/face-similarity';
import { Usuario } from './../../../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class FaceAutoCaptureService {
  usuarioAutenticado = false;
  cpf = '';
  planoSocioTorcedor = 0;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  usuario = new Usuario();

  urlApiUsuario = '';
  urlInnovatrics = '';
  urlOpenDoor = '';

  constructor(private http: HttpClient) {
    this.urlApiUsuario = `${environment.url}/usuario`;
    this.urlInnovatrics = `${environment.url}/innovatrics`;
    this.urlOpenDoor = `${environment.url}/raspberrypi`;
  }

  createfaces(createface: CreateFaces): Observable<any> {
    return this.http.post<Array<any>>(
      `${this.urlInnovatrics}/create-faces`,
      createface
    );
  }

  faceSimilarity(
    probeFaceId: any,
    faceSimilarity: FaceSimilarity
  ): Observable<any> {
    return this.http.post<Array<any>>(
      `${this.urlInnovatrics}/face-similarity?probeFaceId=${probeFaceId}`,
      faceSimilarity
    );
  }

  getUsuario() {
    return this.usuario;
  }

  getUsusarios(): Observable<Usuario[]> {
    return this.http.get<Array<Usuario>>(`${this.urlApiUsuario}/all`);
  }
  usuarioPorCpf(cpf: String): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlApiUsuario}/cpf?cpf=${cpf}`);
  }

  inserirUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlApiUsuario, usuario);
  }

  openDoor() {
    return this.http.post<any>(this.urlOpenDoor + '/open-door', null);
  }

  usuarioEstaAutenticado() {
    const token = localStorage.getItem('usuario');
    if (token !== null) {
      this.usuarioAutenticado = true;
    } else {
      this.usuarioAutenticado = false;
    }
    return this.usuarioAutenticado;
  }
}

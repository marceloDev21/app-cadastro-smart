import { FaceAutoCaptureService } from './../components/dis/face-auto-capture/face-auto-capture.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private faceCaptureService: FaceAutoCaptureService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const isLogado = this.faceCaptureService.usuarioEstaAutenticado();

    if (!isLogado) {
      this.router.navigate(['/login']);
    }

    return isLogado;
  }
}

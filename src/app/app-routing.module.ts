import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentAutoCaptureComponent } from './components/dis/document-auto-capture/document-auto-capture.component';
import { FaceAutoCaptureComponent } from './components/dis/face-auto-capture/face-auto-capture.component';
import { DadosDocumentoComponent } from './dados-documento/dados-documento.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './guards/login/login.module';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'enviar-documento-frente',
  },

  {
    path: 'home',
    loadChildren: () => HomeModule,
  },
  {
    path: 'login',
    loadChildren: () => LoginModule,
  },
  {
    path: 'prova-de-vida',
    component: FaceAutoCaptureComponent,
  },
  {
    path: 'enviar-documento-frente',
    component: DocumentAutoCaptureComponent,
  },
  {
    path: 'enviar-documento-verso',
    component: DocumentAutoCaptureComponent,
  },
  {
    path: 'conferir-dados-documento',
    component: DadosDocumentoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

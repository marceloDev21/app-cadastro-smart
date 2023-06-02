import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentAutoCaptureComponent } from './components/dis/document-auto-capture/document-auto-capture.component';
import { DocumentCameraComponent } from './components/dis/document-camera/document-camera.component';
import { DocumentUiComponent } from './components/dis/document-ui/document-ui.component';
import { FaceAutoCaptureComponent } from './components/dis/face-auto-capture/face-auto-capture.component';
import { FaceCameraComponent } from './components/dis/face-camera/face-camera.component';
import { FaceUiComponent } from './components/dis/face-ui/face-ui/face-ui.component';
import { CoreModule } from './core/core.module';
import { DadosDocumentoComponent } from './dados-documento/dados-documento.component';
import { AuthGuard } from './guards/auth.guard';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    FaceUiComponent,
    FaceAutoCaptureComponent,
    FaceCameraComponent,
    DocumentAutoCaptureComponent,
    DocumentCameraComponent,
    DocumentUiComponent,
    DadosDocumentoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    InputMaskModule,
    DropdownModule,
    TableModule,
    CardModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { DocumentPlaceholderIcon, HTMLDocumentUiElement } from '@innovatrics/dot-auto-capture-ui/document';
import '@innovatrics/dot-auto-capture-ui/document';

@Component({
  selector: 'app-document-ui',
  templateUrl: './document-ui.component.html',
  styleUrls: ['./document-ui.component.css'],
})
export class DocumentUiComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initDocumentUi();
  }

  initDocumentUi() {
    const documentUiElement = document.getElementById(
      'dot-document-auto-capture-ui'
    ) as HTMLDocumentUiElement | null;

    if (documentUiElement) {
      documentUiElement.props = {
        showCameraButtons: true,
        instructions: {
          candidate_selection: 'Imagem adequada',
          document_too_far: 'Aproxime o documento',
          document_too_close: 'Afaste o documento',
          document_centering: 'Centralize o documento',
          document_not_present: 'Posicione o documento',
          sharpness_too_low: 'O Documento não está nítido',
          brightness_too_low: 'Muita luz, procure um lugar menos iluminado!',
          brightness_too_high: 'Pouca luz, procure um lugar mais iluminado!',
          hotspots_present: 'O documento possui reflexos'
        },
        appStateInstructions: {
          loading: { text: 'Analisar Documento...', visible: true },
          waiting: {text: 'Aguarde estamos verificando seus dados', visible: true}
        },
        showDetectionLayer: true,
        // placeholder: DocumentPlaceholderIcon.ID_CORNERS,
        theme: {
          colors: {
            placeholderColor: 'red',
            instructionColor: 'yellow',
            instructionColorSuccess: 'green',
            instructionTextColor: 'black',
            placeholderColorSuccess: 'green',
          },
        },
      };
    }
  }
}

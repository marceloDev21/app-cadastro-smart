import { Component, OnInit } from '@angular/core';
import '@innovatrics/dot-auto-capture-ui/face';
import {
  FacePlaceholderIcon,
  FacePlaceholderIconValues,
  HTMLFacetUiElement,
} from '@innovatrics/dot-auto-capture-ui/face';

@Component({
  selector: 'app-face-ui',
  templateUrl: './face-ui.component.html',
  styleUrls: ['./face-ui.component.css'],
})
export class FaceUiComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initFaceUi();
  }

  initFaceUi() {
    const faceUiElement = document.getElementById(
      'dot-face-auto-capture-ui'
    ) as HTMLFacetUiElement | null;

    if (faceUiElement) {
      faceUiElement.props = {
        showCameraButtons: true,
        placeholder: 'ellipse-solid',
        instructions: {
          candidate_selection: 'Imagem adequada',
          face_too_far: 'Aproxime-se',
          face_too_close: 'Afaste-se',
          face_centering: 'Centralize o rosto',
          face_not_present: 'Posicione o rosto no círculo',
          sharpness_too_low: 'O rosto não está nítido',
          brightness_too_low: 'Muita luz',
          brightness_too_high: 'Pouca luz',
        },
        appStateInstructions: {
          loading: { text: 'Detectando vida...', visible: true },
          waiting: {
            text: 'Aguarde estamos verificando vida em sua imagem',
            visible: true,
          },
        },
        showDetectionLayer: true,
        // placeholder: FacePlaceholderIconValues.CIRCLE_SOLID,
        theme: {
          colors: {
            placeholderColor: 'red',
            instructionColor: 'yellow',
            instructionColorSuccess: 'blue',
            instructionTextColor: 'black',
            placeholderColorSuccess: 'blue',
          },
        },
      };
    }
  }
}

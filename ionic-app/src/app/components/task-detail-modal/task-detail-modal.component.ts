import { Component, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  ModalController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ task?.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p>{{ task?.description }}</p>
    </ion-content>
  `,
})
export class TaskDetailModalComponent {
  @Input() task: any;

  constructor(private modalCtrl: ModalController) { }

  close() {
    this.modalCtrl.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FirebaseMessagingService } from './services/firebase-messaging.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
}) export class AppComponent implements OnInit {

  constructor(
    private firebaseMessaging: FirebaseMessagingService
  ) { }

  async ngOnInit() {
    if (environment.enableFcm) {
      this.initializeFCM();
    }
  }

  private async initializeFCM() {
    // Esperar un poco para que la app se inicialice
    setTimeout(async () => {
      try {
        // Solicitar permiso y obtener token
        await this.firebaseMessaging.requestPermissionAndGetToken();

        // Escuchar mensajes en primer plano
        this.firebaseMessaging.listenMessages();
      } catch (error) {
        console.error('Error inicializando FCM:', error);
      }
    }, 3000);
  }
}

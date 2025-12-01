import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FirebaseMessagingService {
    private messaging: any;

    constructor() {
        if (!environment.enableFcm) {
            return;
        }

        const firebaseConfig = {
            apiKey: 'AIzaSyDPL84n_gzucEXQZvZEJro3ZjmucI1HZNE',
            authDomain: 'app-notificaciones-1dcbe.firebaseapp.com',
            projectId: 'app-notificaciones-1dcbe',
            storageBucket: 'app-notificaciones-1dcbe.firebasestorage.app',
            messagingSenderId: '1059196545370',
            appId: '1:1059196545370:web:2759443431d0586d5eeb63',
            measurementId: 'G-RVLPF1WBJY',
        };

        const app = initializeApp(firebaseConfig);
        this.messaging = getMessaging(app);
    }

    async requestPermissionAndGetToken(): Promise<void> {
        if (!environment.enableFcm || !this.messaging) {
            console.warn('FCM deshabilitado en este entorno.');
            return;
        }

        try {
            const token = await getToken(this.messaging, {
                vapidKey:
                    'BP39UWJLwk5OiTe_2e48KVK-75gGwG5Iy_wg3BDz4gI9qyJPcO67WnqR7EFVA5F8Bt2XQgPceWqC8-Xr6-IO5Qc',
            });
            console.log('FCM token:', token);
            // Aquí podrías enviarlo al backend o Firestore
        } catch (error) {
            console.error('Error obteniendo token FCM', error);
        }
    }

    listenMessages(): void {
        if (!environment.enableFcm || !this.messaging) {
            return;
        }

        onMessage(this.messaging, (payload) => {
            console.log('Notificación recibida en primer plano:', payload);
        });
    }
}


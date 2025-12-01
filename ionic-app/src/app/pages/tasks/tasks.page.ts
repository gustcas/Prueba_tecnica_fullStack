import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  ModalController,
} from '@ionic/angular/standalone';
import { TaskDetailModalComponent } from '../../components/task-detail-modal/task-detail-modal.component';
import { TasksService, Task } from '../../services/tasks.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
  ],
})
export class TasksPage implements OnInit {
  tasks: Task[] = [];
  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private tasksService: TasksService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(event?: any): void {
    this.loading = true;

    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      },
      error: () => {
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      },
    });
  }

  async openDetail(task: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskDetailModalComponent,
      componentProps: { task },
    });
    await modal.present();
  }

  doRefresh(event: any) {
    this.loadTasks(event);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}

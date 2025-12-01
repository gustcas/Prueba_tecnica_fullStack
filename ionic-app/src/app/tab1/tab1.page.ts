import { Component } from '@angular/core';
import { TasksPage } from '../pages/tasks/tasks.page';

@Component({
  standalone: true,
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [TasksPage],
})
export class Tab1Page {
  constructor() {}
}

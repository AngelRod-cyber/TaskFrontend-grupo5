import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TasksListComponent,
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule
  ]
})
export class TasksModule { }

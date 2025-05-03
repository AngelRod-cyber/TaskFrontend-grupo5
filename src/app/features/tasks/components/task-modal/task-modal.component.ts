import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TasksService, Task } from '../../../../core/services/tasks.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();

  title = '';
  description = '';

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    if (this.task) {
      this.title = this.task.title;
      this.description = this.task.description;
    }
  }

  saveTask(): void {
    if (this.task) {
      // Actualizar tarea existente
      this.tasksService
        .updateTask(this.task.id, { title: this.title, description: this.description })
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Tarea actualizada',
            text: 'La tarea se actualizó correctamente.',
            timer: 2000,
            showConfirmButton: false,
          });
          this.close.emit();
        });
    } else {
      // Crear nueva tarea
      this.tasksService
        .createTask({ title: this.title, description: this.description, completed: false })
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Tarea creada',
            text: 'La nueva tarea se creó correctamente.',
            timer: 2000,
            showConfirmButton: false,
          });
          this.close.emit();
        });
    }
  }
}

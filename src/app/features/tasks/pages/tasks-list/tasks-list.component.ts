import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TasksService, Task } from '../../../../core/services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  showModal = false;
  taskToEdit: Task | null = null;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  openModal(task: Task | null = null): void {
    this.taskToEdit = task;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.taskToEdit = null;
    this.loadTasks();
  }

  deleteTask(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasksService.deleteTask(id).subscribe(() => {
          this.loadTasks();
          Swal.fire('¡Eliminado!', 'La tarea ha sido eliminada.', 'success');
        });
      }
    });
  }

  toggleCompleted(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.tasksService.updateTask(task.id, updatedTask).subscribe(() => {
      this.loadTasks();
      const message = updatedTask.completed
        ? '¡Tarea marcada como completada!'
        : '¡Tarea marcada como pendiente!';
      Swal.fire('Actualizado', message, 'success');
    });
  }
}

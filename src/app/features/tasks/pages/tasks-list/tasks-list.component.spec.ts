import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { TasksListComponent } from './tasks-list.component';
import { TasksService, Task } from '../../../../core/services/tasks.service';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { FormsModule } from '@angular/forms';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let tasksServiceSpy: jasmine.SpyObj<TasksService>;

  const mockTasks: Task[] = [
    {
      id: 1, title: 'Task 1', description: 'Description 1', completed: false,
      userId: 0
    },
    {
      id: 2, title: 'Task 2', description: 'Description 2', completed: true,
      userId: 0
    },
  ];

  beforeEach(async () => {
    tasksServiceSpy = jasmine.createSpyObj('TasksService', ['getTasks', 'deleteTask', 'updateTask']);

    await TestBed.configureTestingModule({
      declarations: [TasksListComponent, TaskModalComponent],
      imports: [FormsModule],
      providers: [{ provide: TasksService, useValue: tasksServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    tasksServiceSpy.getTasks.and.returnValue(of(mockTasks));
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las tareas en la inicialización', () => {
    component.ngOnInit();
    expect(tasksServiceSpy.getTasks).toHaveBeenCalled();
    expect(component.tasks.length).toBe(2);
    expect(component.tasks).toEqual(mockTasks);
  });

  it('debería abrir el modal con la tarea seleccionada para editar', () => {
    spyOn(component, 'openModal').and.callThrough();
    const taskToEdit = mockTasks[0];
    component.openModal(taskToEdit);

    expect(component.taskToEdit).toEqual(taskToEdit);
    expect(component.showModal).toBeTrue();
  });

  it('debería cerrar el modal y recargar las tareas', () => {
    spyOn(component, 'loadTasks');
    component.closeModal();

    expect(component.showModal).toBeFalse();
    expect(component.taskToEdit).toBeNull();
    expect(component.loadTasks).toHaveBeenCalled();
  });

  
});

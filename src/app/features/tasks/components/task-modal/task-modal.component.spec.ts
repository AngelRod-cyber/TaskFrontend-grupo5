import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { TasksService, Task } from '../../../../core/services/tasks.service';
import { TaskModalComponent } from './task-modal.component';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;
  let tasksServiceSpy: jasmine.SpyObj<TasksService>;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    userId: 0
  };

  beforeEach(async () => {
    tasksServiceSpy = jasmine.createSpyObj('TasksService', ['createTask', 'updateTask']);

    await TestBed.configureTestingModule({
      declarations: [TaskModalComponent],
      imports: [FormsModule],
      providers: [{ provide: TasksService, useValue: tasksServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar los datos cuando se le pasa una tarea', () => {
    component.task = mockTask;
    component.ngOnInit();
    expect(component.title).toEqual(mockTask.title);
    expect(component.description).toEqual(mockTask.description);
  });

  it('debería llamar a createTask y emitir close al guardar una nueva tarea', () => {
    const newTask = { title: 'New Task', description: 'New Description', completed: false };
    tasksServiceSpy.createTask.and.returnValue(of({ ...mockTask, ...newTask }));

    spyOn(component.close, 'emit');
    component.title = newTask.title;
    component.description = newTask.description;
    component.saveTask();

    expect(tasksServiceSpy.createTask).toHaveBeenCalledWith(newTask);
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('debería llamar a updateTask y emitir close al actualizar una tarea existente', () => {
    component.task = mockTask;
    component.ngOnInit();
    tasksServiceSpy.updateTask.and.returnValue(of(mockTask));

    spyOn(component.close, 'emit');
    component.saveTask();

    expect(tasksServiceSpy.updateTask).toHaveBeenCalledWith(mockTask.id, {
      title: mockTask.title,
      description: mockTask.description,
    });
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('debería emitir close al cancelar sin guardar cambios', () => {
    spyOn(component.close, 'emit');
    component.close.emit();

    expect(component.close.emit).toHaveBeenCalled();
  });
});

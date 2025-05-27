import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TasksService, Task } from './tasks.service';
import { environment } from '../../../environments/environment';

describe('TasksService', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiTasksUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });
    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);

    // Simula un userId en el localStorage
    localStorage.setItem('userId', '42');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks for the logged-in user', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Desc', completed: false, userId: 42 },
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${apiUrl}?userId=42`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a new task with userId', () => {
    const taskInput = { title: 'New Task', description: 'Test', completed: false };
    const createdTask: Task = { id: 2, ...taskInput, userId: 42 };

    service.createTask(taskInput).subscribe(task => {
      expect(task).toEqual(createdTask);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ ...taskInput, userId: 42 });
    req.flush(createdTask);
  });

  it('should update an existing task with userId', () => {
    const taskUpdate = { title: 'Updated', completed: true };
    const updatedTask: Task = { id: 3, title: 'Updated', description: 'Old', completed: true, userId: 42 };

    service.updateTask(3, taskUpdate).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${apiUrl}/3`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ ...taskUpdate, userId: 42 });
    req.flush(updatedTask);
  });
});

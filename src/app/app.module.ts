import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Para realizar solicitudes HTTP
import { AppRoutingModule } from './app-routing.module'; // Para manejo de rutas
import { AppComponent } from './app.component';

// Módulos y Componentes
import { TasksModule } from './features/tasks/tasks.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'; // Módulo de tareas
import { authReducer } from './store/auth/auth.reducer';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent, // Componente raíz
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TasksModule,
    StoreModule.forRoot({ auth: authReducer}, {}),
    EffectsModule.forRoot([]), // Importar el módulo de tareas
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}

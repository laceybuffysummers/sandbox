import { EqualValidator } from './directives/equal-validator.directive';
import { AuthGuard } from './guards/auth-guard';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { MatConfirmComponent } from './components/confirm/mat-confirm/mat-confirm.component';
import { MatConfirmService } from './services/confirm/concrete/mat-confirm.service';
import { IConfirmServiceToken } from './services/confirm/i-confirm.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders, ErrorHandler, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertModule } from 'ngx-bootstrap';
import { AppErrorHandler } from './infrastructure/app-error-handler';
import { IAlertsServiceToken } from './services/alerts/ialerts.service';
import { AlertsService } from './services/alerts/concrete/alerts.service';
import { IProcessServiceToken } from './services/process/i-process-service';
import { ProcessService } from './services/process/concrete/process.service';
import { ProcessComponent } from './components/process/process.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ServiceLocator } from './infrastructure/service-locator';
import { UploadComponent } from './components/upload/upload.component';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { IAuthServiceToken } from './services/auth/i-auth.service';
import { AuthService } from './services/auth/concrete/auth.service';
import { IEntityFilesServiceToken } from './services/files/i-entity-files.service';
import { EntityFilesService } from './services/files/concrete/entity-files.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    AlertsComponent,
    ProcessComponent,
    MatConfirmComponent,
    EqualValidator,
    FileDropDirective,
    FileSelectDirective,
    UploadComponent,
  ],
  entryComponents: [
    MatConfirmComponent
  ],
  exports: [
    AlertsComponent,
    ProcessComponent,
    EqualValidator,
    UploadComponent
  ]
})
export class AppCommonModule {

  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppCommonModule,
      providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: IAlertsServiceToken, useClass: AlertsService },
        { provide: IProcessServiceToken, useClass: ProcessService },
        { provide: IConfirmServiceToken, useClass: MatConfirmService },
        { provide: IAuthServiceToken, useClass: AuthService },
        { provide: IEntityFilesServiceToken, useClass: EntityFilesService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        AuthGuard
      ]
    };
  }
}

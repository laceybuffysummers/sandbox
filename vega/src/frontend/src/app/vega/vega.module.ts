import { NavbarComponent } from './components/navbar/navbar.component';
import { VehicleComponent } from './components/vehicles/entity/vehicle.component';
import { AppCommonModule } from './../common/app-common.module';
import { VegaComponent } from './vega.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { vegaRouting } from './vega.routing';
import { MatSortModule } from '@angular/material/sort';
import { HomeComponent } from './components/home/home.component';
import { VehiclesComponent } from './components/vehicles/overviews/vehicles.component';
import { VehicleOverviewComponent } from './components/vehicles/overviews/vehicle-overview.component';
import { VehiclesFilterComponent } from './components/vehicles/overviews/vehicles-filter.component';
import { AboutComponent } from './components/about/about.component';
import { VehiclesStatisticsComponent } from './components/vehicles/statistics/vehicles-statistics.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { IAuthServiceToken } from '../common/services/auth/i-auth.service';
import { IConfigServiceToken } from '../common/services/config/i-config-service';
import { VegaConfigService } from './services/common/concrete/vega-config.service';
import { VehiclePhotosComponent } from './components/vehicles/entity/vehicle-photos/vehicle-photos.component';

@NgModule({
  declarations: [
    VehiclesComponent,
    VehicleOverviewComponent,
    HomeComponent,
    VegaComponent,
    VehiclesFilterComponent,
    VehicleComponent,
    AboutComponent,
    NavbarComponent,
    VehiclesStatisticsComponent,
    RegisterComponent,
    LoginComponent,
    VehiclePhotosComponent
  ],
  imports: [
    AppCommonModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    vegaRouting,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    ChartsModule
  ],
  exports: [
    VegaComponent
  ],
  bootstrap: [VegaComponent]
})
export class VegaModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: VegaModule,
      providers: [
        { provide: IConfigServiceToken, useClass: VegaConfigService }
      ]
    };
  }
}

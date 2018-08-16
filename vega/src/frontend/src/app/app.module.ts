import { VegaModule } from './vega/vega.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    VegaModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

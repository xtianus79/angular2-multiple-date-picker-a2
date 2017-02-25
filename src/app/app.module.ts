import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent, HeroesComponent, DashboardComponent } from './dashboard/index';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/index';
import { HeroService } from './services/index';
import { routing } from './app.routing';

import { MaterialModule } from '@angular/material';

import { MultipleDatePicker } from './multiple-date-picker/index';

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
        routing,
        MaterialModule
    ],
    declarations: [ 
        AppComponent,
        UiComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroesComponent,
        MultipleDatePicker
     ],
     providers: [
         HeroService,
         MultipleDatePicker
     ],
    bootstrap: [ AppComponent ]
})
export class AppModule { 

}
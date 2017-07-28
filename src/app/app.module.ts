import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent, HeroesComponent, DashboardComponent } from './dashboard/index';
import { AppComponent } from './app.component';
import { UiComponent } from './ui/index';
import { HeroService } from './services/index';
import { routing } from './app.routing';

import { MaterialModule } from '@angular/material';

// add DateClicked Helper to providers if used in future. remember to add to index.ts for export
import { MultipleDatePicker, DateRangeHelper, DateClickedDirective } from './multiple-date-picker/index';

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
        MultipleDatePicker,
        DateClickedDirective
     ],
     providers: [
         HeroService,
         MultipleDatePicker,
         DateRangeHelper
     ],
    bootstrap: [ AppComponent ]
})
export class AppModule { 

}
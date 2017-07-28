"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var index_1 = require("./dashboard/index");
var app_component_1 = require("./app.component");
var index_2 = require("./ui/index");
var index_3 = require("./services/index");
var app_routing_1 = require("./app.routing");
var material_1 = require("@angular/material");
// add DateClicked Helper to providers if used in future. remember to add to index.ts for export
var index_4 = require("./multiple-date-picker/index");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                material_1.MaterialModule
            ],
            declarations: [
                app_component_1.AppComponent,
                index_2.UiComponent,
                index_1.DashboardComponent,
                index_1.HeroDetailComponent,
                index_1.HeroesComponent,
                index_4.MultipleDatePicker,
                index_4.DateClickedDirective
            ],
            providers: [
                index_3.HeroService,
                index_4.MultipleDatePicker,
                index_4.DateRangeHelper
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
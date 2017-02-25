"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../services/index");
var index_2 = require("../multiple-date-picker/index");
var DashboardComponent = (function () {
    function DashboardComponent(router, heroService) {
        this.router = router;
        this.heroService = heroService;
        this.heroes = [];
        this.initialCount = ["Tue Feb 28 2017 00:00:00 GMT-0500"];
        this.charles = 'Christian';
        this.testItems = [
            { 'item': 'array1', 'id': 1 },
            { 'item': 'array2', 'id': 2 },
            { 'item': 'array3', 'id': 3 },
        ]; // potential use if person wanted to create a choosen item to associate with a list of arrays
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroService.getHeroes()
            .then(function (heroes) { return _this.heroes = heroes.slice(1, 5); });
        console.log('this is here');
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        console.log('i was there in AfterViewInit');
    };
    DashboardComponent.prototype.findArrayFn = function () {
        // day is from mdp's scope of finArrayofDays(day) function 
        this.multipleDatePicker.findArrayofDays();
        console.log('this is the findArrayofDays() function = ' + this.multipleDatePicker.findArrayofDays);
    };
    DashboardComponent.prototype.runGenerateFn = function () {
        // day is from mdp's scope of finArrayofDays(day) function 
        this.multipleDatePicker.runGenerate();
        console.log('this is the runGenerate() function = ' + this.multipleDatePicker.runGenerate);
    };
    DashboardComponent.prototype.gotoDetail = function (hero) {
        var link = ['/detail', hero.id];
        this.router.navigate(link);
    };
    DashboardComponent.prototype.getNewValue = function () {
        console.log('this is the new initial value 99999 = ' + this.initialCount);
    };
    DashboardComponent.prototype.arrayMock1 = function () {
        this.initialCount = ["Tue Feb 28 2017 00:00:00 GMT-0500"];
    };
    DashboardComponent.prototype.arrayMock2 = function () {
        this.initialCount = [1488171600000];
    };
    DashboardComponent.prototype.arrayMock3 = function () {
        this.initialCount = [1, 2, 3, 3, 4, 5, 6, 7, 8, 9];
    };
    DashboardComponent.prototype.fireClearDays = function () {
        console.log('this is the new initial value BEFORE = ' + this.initialCount);
        this.multipleDatePicker.clearDays();
        console.log('this is the new initial value AFTER = ' + this.initialCount);
    };
    DashboardComponent.prototype.logMonthChanged = function (newMonth, oldMonth) {
        alert('a new month : ' + newMonth.format('YYYY-M-DD') + ' || old month : ' + oldMonth.format('YYYY-M-DD'));
        console.log('what is newMonth = ' + newMonth);
    }; // future test case shelf for now. regarding change month
    return DashboardComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DashboardComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DashboardComponent.prototype, "charles", void 0);
__decorate([
    core_1.ViewChild(index_2.MultipleDatePicker),
    __metadata("design:type", index_2.MultipleDatePicker)
], DashboardComponent.prototype, "multipleDatePicker", void 0);
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-dashboard',
        templateUrl: 'dashboard.component.html',
        styleUrls: ['dashboard.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.HeroService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
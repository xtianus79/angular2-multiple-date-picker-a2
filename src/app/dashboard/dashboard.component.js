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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../services/index");
var index_2 = require("../multiple-date-picker/index");
var moment = require("moment/moment");
var DashboardComponent = (function () {
    function DashboardComponent(router, heroService) {
        var _this = this;
        this.router = router;
        this.heroService = heroService;
        this.heroes = [];
        this.charles = 'Christian';
        this.testItems = [
            { 'item': 'array1', 'id': 1 },
            { 'item': 'array2', 'id': 2 },
            { 'item': 'array3', 'id': 3 },
        ]; // potential use if person wanted to create a choosen item to associate with a list of arrays
        this.oneDaySelectionOnly = function (event, date) {
            console.log('this.initialCount 333 = ', _this.initialCount);
            _this.initialCount.length = 0;
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroService.getHeroes()
            .then(function (heroes) { return _this.heroes = heroes.slice(1, 5); });
        //console.log('this is here = ' + matIcons);
        // set array to either [] or the following values like example below
        this.highlightDays = [
            { date: moment().date(22).valueOf(), css: 'holiday', selectable: false, title: 'Holiday time !' },
            { date: moment().date(25).valueOf(), css: 'off', selectable: false, title: 'We don\'t work today' },
            { date: moment().date(30).valueOf(), css: 'birthday', selectable: true, title: 'I\'m thir... i\'m 28, seriously, I mean ...' }
        ];
        console.log('date: moment().date(19).valueOf() ', moment().date(19).valueOf());
        console.log('date: moment().date(20).valueOf() ', moment().date(20).valueOf());
        console.log('date: moment().date(21).valueOf() ', moment().date(21).valueOf());
        this.initialCount = [];
        // enter variables for startDates and End dates
        var startDate = 1509768000000; // enter variable or ms value
        var endDate = 1510722000000; // enter variable or ms value // 1502510400000
        // console.log('calucator values ' + this.dateRangeHelper.dateRangeDaysCalculator(endDate, startDate))
        if (index_2.DateRangeHelper.dateRangeDaysCalculator(endDate, startDate) >= 0) {
            var days = index_2.DateRangeHelper.dateRangeDaysCalculator(endDate, startDate);
            this.datesArray = index_2.DateRangeHelper.getDates(new Date(startDate), (new Date(startDate)).addDays(days)); // date object used not moment in this case
            console.log('this.datesArray ', this.datesArray);
        }
        // takes array dates from daterangehelper and adds them to highlighted days for date picker day highlights
        if (this.datesArray !== undefined && this.datesArray.length > 0) {
            var daysArray = this.datesArray;
            var arrayObject = daysArray.find(function (x) { return x; });
            var arrayKeys = Object.keys(daysArray);
            if (arrayObject !== undefined && arrayKeys.length > 0) {
                this.highlightDays = this.datesArray;
                var stayNames = 'Christian Smith'; // should be set to variable 
                for (var i in daysArray) {
                    if (true) {
                        this.highlightDays.push({ date: daysArray[i], css: 'stay-dates', selectable: true, title: "days off for " + stayNames }); // set strings
                    }
                }
            }
        }
        // calculate addional months to add onto the month object... if this is corrupt in anyway it will default to todays month info
        var monthsFromToday = index_2.DateRangeHelper.dateRangeMonthsCalculator(startDate);
        if (monthsFromToday > 0) {
            this.myMonth = moment().add(monthsFromToday, 'months');
        }
        else {
            this.myMonth = moment().startOf('day');
        }
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        this.initialCount = [];
        console.log(' i was there in AfterViewInit ');
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
            styleUrls: ['dashboard.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [router_1.Router,
            index_1.HeroService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
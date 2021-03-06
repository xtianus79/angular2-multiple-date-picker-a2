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
var forms_1 = require("@angular/forms");
var moment = require("moment/moment");
var MultipleDatePicker = (function () {
    function MultipleDatePicker() {
        this.cssDaysOfSurroundingMonths = this.cssDaysOfSurroundingMonths || 'picker-empty';
        this.arrow = 0;
        this.month = moment().startOf('day'); // today's day at start of day midnight or passed in value
        this.projectScope = [];
        this.days = [];
        this.daysOff = this.daysOff || [];
        this.disableBackButton = false;
        this.disableNextButton = false;
        this.daysOfWeek = [];
        // _cssDaysOfSurroundingMonths: any = this._cssDaysOfSurroundingMonths || 'picker-empty';
        this.yearsForSelect = [];
        this.propagateChange = function (_) { };
    }
    MultipleDatePicker_1 = MultipleDatePicker;
    MultipleDatePicker.prototype.ngOnInit = function () {
        /**
         * check to see if this.month is undefined... if it is set to todays date info
         * protection for calendar month adjustments -- otherwise will break upon loading
         */
        if (this.month === undefined) {
            this.month = moment().startOf('day');
        }
        this.generate();
        this.daysOfWeek = this.getDaysOfWeek();
        this.arrowSelected();
        this.weekDaysOff = this.weekDaysOff || [];
    };
    MultipleDatePicker.prototype.arrowSelected = function () {
        if (this.matIcons) {
            return this.arrow = 1;
        }
        else if (this.fontAwesome) {
            return this.arrow = 2;
        }
    };
    MultipleDatePicker.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== undefined) {
            this.projectScope = value;
            if (value !== null) {
                this.projectScope = this.projectScope.map(function (val) {
                    return moment(val);
                });
                this.projectScope.forEach(function (val) {
                    var day = val;
                    _this.days.forEach(function (d) {
                        if (d.date.isSame(day)) {
                            d.mdp.selected = true;
                            return;
                        }
                    });
                });
            }
        }
    };
    MultipleDatePicker.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    MultipleDatePicker.prototype.registerOnTouched = function () { };
    Object.defineProperty(MultipleDatePicker.prototype, "projectScope2", {
        get: function () {
            return this._projectScope;
        },
        set: function (val) {
            this._projectScope = val;
            this.propagateChange(this._projectScope);
        },
        enumerable: true,
        configurable: true
    });
    MultipleDatePicker.prototype.checkNavigationButtons = function () {
        var today = moment(), previousMonth = moment(this.month).subtract(1, 'month'), nextMonth = moment(this.month).add(1, 'month');
        this.disableBackButton = this.disableNavigation || (this.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
        this.disableNextButton = this.disableNavigation || (this.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
    };
    MultipleDatePicker.prototype.getDaysOfWeek = function () {
        /*To display days of week names in moment.lang*/
        var momentDaysOfWeek = moment().localeData().weekdaysMin(), daysOfWeek = [];
        for (var i = 1; i < 7; i++) {
            daysOfWeek.push(momentDaysOfWeek[i]);
        }
        if (this.sundayFirstDay) {
            daysOfWeek.splice(0, 0, momentDaysOfWeek[0]);
        }
        else {
            daysOfWeek.push(momentDaysOfWeek[0]);
        }
        return daysOfWeek;
    };
    MultipleDatePicker.prototype.getMonthYearToDisplay = function () {
        var month = this.month.format('MMMM');
        return month.charAt(0).toUpperCase() + month.slice(1);
    };
    MultipleDatePicker.prototype.getYearsForSelect = function () {
        var now = moment(), changeYearPast = Math.max(0, parseInt(this.changeYearPast, 10) || 0), changeYearFuture = Math.max(0, parseInt(this.changeYearFuture, 10) || 0), min = moment(this.month).subtract(changeYearPast, 'year'), max = moment(this.month).add(changeYearFuture, 'year'), result = [];
        max.add(1, 'year');
        for (var m = moment(min); max.isAfter(m, 'year'); m.add(1, 'year')) {
            if ((!this.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!this.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
                result.push(m.format('YYYY'));
            }
        }
        return result;
    };
    ;
    MultipleDatePicker.prototype.toggleDay = function (event, day) {
        event.preventDefault();
        if (day.mdp.otherMonth && !this.fireEventsForDaysOfSurroundingMonths) {
            return;
        }
        var prevented = false;
        event.preventDefault = function () {
            prevented = true;
        };
        if (typeof this.dayClick == 'function') {
            if (!day.mdp.selected) {
                this.projectScope = [day.date];
                this.generate();
                this.dayClick(event, day);
            }
            else {
                this.clearDays();
                this.dayClick(event, day);
            }
        }
        if (day.selectable && !prevented) {
            day.mdp.selected = !day.mdp.selected;
            if (day.mdp.selected) {
                this.projectScope.push(day.date);
                // console.log('this project scope = ' + this.projectScope); // for testing keep!
            }
            else {
                var idx = -1;
                for (var i = 0; i < this.projectScope.length; ++i) {
                    if (moment.isMoment(this.projectScope[i])) {
                        if (this.projectScope[i].isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                    else {
                        if (this.projectScope[i].date.isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                }
                if (idx !== -1) {
                    this.projectScope.splice(idx, 1);
                }
            }
        }
        this.propagateChange(this.projectScope);
    };
    MultipleDatePicker.prototype.clearDays = function () {
        this.projectScope = [];
        this.generate();
        // console.log('clearDays was fired off'); // for testing
    };
    MultipleDatePicker.prototype.runGenerate = function () {
        this.generate();
    }; // remove this and from html
    MultipleDatePicker.prototype.rightClicked = function (event, day) {
        if (typeof this.rightClick === 'function') {
            event.preventDefault();
            this.rightClick(event, day);
        }
    };
    MultipleDatePicker.prototype.getDayClasses = function (day) {
        //console.log('this is day = ' + JSON.stringify(day));
        var css = '';
        if (day.css && (!day.mdp.otherMonth || this.showDaysOfSurroundingMonths)) {
            css += ' ' + day.css;
        }
        if (this.cssDaysOfSurroundingMonths && day.mdp.otherMonth) {
            css += ' ' + this.cssDaysOfSurroundingMonths;
        }
        if (day.mdp.selected) {
            css += ' picker-selected';
        }
        if (!day.selectable) {
            //console.log('what is day.css ' + JSON.stringify(day));
            css += ' picker-off';
        }
        if (day.mdp.today) {
            if (this.highlightDays !== undefined && this.highlightDays.length > 0) {
                var arrayObject = this.highlightDays.find(function (x) { return x.css; });
                // let index = this.highlightDays.indexOf(arrayObject); // gives number of occurenses in array
                var arrayKeys = Object.keys(this.highlightDays);
                if (arrayObject !== undefined && arrayKeys.length > 0) {
                    var highlightDayCss = arrayObject.css;
                    css += ' today ' + highlightDayCss;
                }
                else {
                    css += ' today ';
                }
            }
        }
        if (day.mdp.past) {
            css += ' past';
        }
        if (day.mdp.future) {
            css += ' future';
        }
        if (day.mdp.otherMonth) {
            css += ' picker-other-month';
        }
        //console.log('this is css = ' + css)
        return css;
    };
    /*Navigate to another month*/
    MultipleDatePicker.prototype.changeMonth = function (event, disable, add) {
        if (disable) {
            return;
        }
        event.preventDefault();
        var prevented = false;
        event.preventDefault = function () {
            // console.log('entered into preventDefault *****'); // for testing
            prevented = true;
        };
        var monthTo = moment(this.month).add(add, 'month');
        if (typeof this.monthClick == 'function') {
            this.monthClick(event, monthTo);
        }
        if (!prevented) {
            var oldMonth = moment(this.month);
            this.month = monthTo;
            if (typeof this.monthChanged == 'function') {
                this.monthChanged(this.month, oldMonth);
            }
            this.generate();
        }
    };
    /*Change year*/
    MultipleDatePicker.prototype.changeYear = function (year) {
        this.month = this.month.year(parseInt(year, 10));
    };
    ;
    /*Check if the date is off : unselectable*/
    MultipleDatePicker.prototype.isDayOff = function (day) {
        //console.log('I am here in isDayOff');
        // console.log('further test = ' + JSON.stringify(this.highlightDays));
        // console.log('this.weekDaysOff 11111 ', this.weekDaysOff instanceof Array);
        // console.log('this.weekDaysOff 22222 ' + this.weekDaysOff);
        return this.allDaysOff ||
            (this.disableDaysBefore && moment(day.date).isBefore(moment(), 'day')) ||
            (!!this.disableDaysAfter && moment(day.date).isAfter(moment(), 'day')) ||
            ((this.weekDaysOff instanceof Array) && this.weekDaysOff.some(function (dayOff) {
                return day.date.day() === dayOff;
            })) ||
            ((this.daysOff === Array) && this.daysOff.some(function (dayOff) {
                return day.date.isSame(dayOff, 'day');
            })) ||
            ((this.daysAllowed === Array) && !this.daysAllowed.some(function (dayAllowed) {
                return day.date.isSame(dayAllowed, 'day');
            })) ||
            ((Object.prototype.toString.call(this.highlightDays) === '[object Array]') && this.highlightDays.some(function (highlightDay) {
                // console.log('this.highlightdays = ' + typeof highlightDay);
                // console.log('this is here in highlightdays ******** ' + ' 888 ' + highlightDay.css + ' 888 ' + day.date.isSame(highlightDay.date, 'day') + ' -- ' + !highlightDay.selectable);
                return day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable && highlightDay.css;
            }));
    };
    /*Check if the date is selected*/
    MultipleDatePicker.prototype.isSelected = function (day) {
        return this.projectScope.some(function (d) {
            return day.date.isSame(d, 'day');
        });
    };
    /*Generate the calendar*/
    MultipleDatePicker.prototype.generate = function () {
        var _this = this;
        console.log('this.month.year = ', this.month);
        var year = this.month.year().toString();
        this.yearsForSelect = this.getYearsForSelect();
        this.monthToDisplay = this.getMonthYearToDisplay();
        this.yearToDisplay = this.month.format('YYYY');
        var previousDay = moment(this.month).date(0).day(this.sundayFirstDay ? 0 : 1).subtract(1, 'day');
        if (moment(this.month).date(0).diff(previousDay, 'day') > 6) {
            previousDay = previousDay.add(1, 'week');
        }
        var firstDayOfMonth = moment(this.month).date(1), days = [], now = moment(), lastDay = moment(firstDayOfMonth).endOf('month'), createDate = function () {
            var day = {
                selectable: true,
                date: moment(previousDay.add(1, 'day')),
                css: null,
                title: '',
                mdp: {
                    selected: false,
                    today: false,
                    past: true,
                    future: true,
                    otherMonth: false
                },
            };
            if ((Object.prototype.toString.call(_this.highlightDays) === '[object Array]')) {
                console.log('did you get here *********************');
                var hlDay = _this.highlightDays.filter(function (d) {
                    return day.date.isSame(d.date, 'day');
                });
                day.css = hlDay.length > 0 ? hlDay[0].css : '';
                day.title = hlDay.length > 0 ? hlDay[0].title : '';
            }
            day.selectable = !_this.isDayOff(day);
            //console.log('day.selectable %%%%%%%%%%%%% = ' + this.isDayOff(day));
            day.mdp.selected = _this.isSelected(day);
            day.mdp.today = day.date.isSame(now, 'day');
            day.mdp.past = day.date.isBefore(now, 'day');
            day.mdp.future = day.date.isAfter(now, 'day');
            if (!day.date.isSame(_this.month, 'month')) {
                day.mdp.otherMonth = true;
            }
            return day;
        };
        var maxDays = lastDay.diff(previousDay, 'days'), lastDayOfWeek = this.sundayFirstDay ? 6 : 0;
        if (lastDay.day() !== lastDayOfWeek) {
            maxDays += (this.sundayFirstDay ? 6 : 7) - lastDay.day();
        }
        for (var j = 0; j < maxDays; j++) {
            days.push(createDate());
        }
        this.days = days;
        this.checkNavigationButtons();
        // console.log('christian = ' + ' -- ' + JSON.stringify(this.highlightDays) + ' --- ' + JSON.stringify(this.days, null, 4)); // keep for debugging
        this.propagateChange(this.projectScope);
    };
    MultipleDatePicker.prototype.findArrayofDays = function () {
        console.log('this.projectScope = ' + this.projectScope);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MultipleDatePicker.prototype, "highlightDays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultipleDatePicker.prototype, "dayClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleDatePicker.prototype, "dayHover", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleDatePicker.prototype, "rightClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultipleDatePicker.prototype, "monthChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultipleDatePicker.prototype, "fontAwesome", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultipleDatePicker.prototype, "matIcons", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleDatePicker.prototype, "monthClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MultipleDatePicker.prototype, "weekDaysOff", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleDatePicker.prototype, "allDaysOff", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultipleDatePicker.prototype, "daysAllowed", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultipleDatePicker.prototype, "disableNavigation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultipleDatePicker.prototype, "disallowBackPastMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleDatePicker.prototype, "disallowGoFuturMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultipleDatePicker.prototype, "showDaysOfSurroundingMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultipleDatePicker.prototype, "cssDaysOfSurroundingMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleDatePicker.prototype, "fireEventsForDaysOfSurroundingMonths", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultipleDatePicker.prototype, "disableDaysBefore", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultipleDatePicker.prototype, "disableDaysAfter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleDatePicker.prototype, "changeYearPast", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultipleDatePicker.prototype, "changeYearFuture", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MultipleDatePicker.prototype, "month", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MultipleDatePicker.prototype, "projectScope", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultipleDatePicker.prototype, "sundayFirstDay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MultipleDatePicker.prototype, "_projectScope", void 0);
    MultipleDatePicker = MultipleDatePicker_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'multiple-date-picker',
            templateUrl: 'multiple-date-picker.html',
            styleUrls: ['multiple-date-picker.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return MultipleDatePicker_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], MultipleDatePicker);
    return MultipleDatePicker;
    var MultipleDatePicker_1;
}());
exports.MultipleDatePicker = MultipleDatePicker;
// (function (angular) {
//     'use strict';
//     var multipleDatePicker = function () {
//             return {
//                 restrict: 'AE',
//                 scope: {
//                     /*
//                      * Type : Array of moment dates
//                      * Array will mutate when user select/unselect a date
//                      */
//                     ngModel: '=?',
//                     /*
//                      * Type: array of objects (see doc)
//                      * Days to highlights
//                      * */
//                     highlightDays: '=?',
//                     dayClick: '=?',
//                     dayHover: '=?',
//                     rightClick: '=?',
//                     month: '=?',
//                     monthChanged: '=?',
//                     monthClick: '=?',
//                     weekDaysOff: '=?',
//                     allDaysOff: '=?',
//                     daysAllowed: '=?',
//                     sundayFirstDay: '=?',
//                     disableNavigation: '=?',
//                     disallowBackPastMonths: '=?',
//                     disallowGoFuturMonths: '=?',
//                     showDaysOfSurroundingMonths: '=?',
//                     cssDaysOfSurroundingMonths: '=?',
//                     fireEventsForDaysOfSurroundingMonths: '=?',
//                     disableDaysBefore: '=?',
//                     disableDaysAfter: '=?',
//                     changeYearPast: '=?',
//                     changeYearFuture: '=?'
//                 },
//                 link: function (scope) {
//                     scope.ngModel = scope.ngModel || [];
//                     /*utility functions*/
//                     var checkNavigationButtons = function () {
//                             var today = moment(),
//                                 previousMonth = moment(scope.month).subtract(1, 'month'),
//                                 nextMonth = moment(scope.month).add(1, 'month');
//                             scope.disableBackButton = scope.disableNavigation || (scope.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
//                             scope.disableNextButton = scope.disableNavigation || (scope.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
//                         },
//                         getDaysOfWeek = function () {
//                             /*To display days of week names in moment.lang*/
//                             var momentDaysOfWeek = moment().localeData()._weekdaysMin,
//                                 days = [];
//                             for (var i = 1; i < 7; i++) {
//                                 days.push(momentDaysOfWeek[i]);
//                             }
//                             if (scope.sundayFirstDay) {
//                                 days.splice(0, 0, momentDaysOfWeek[0]);
//                             } else {
//                                 days.push(momentDaysOfWeek[0]);
//                             }
//                             return days;
//                         },
//                         getMonthYearToDisplay = function () {
//                             var month = scope.month.format('MMMM');
//                             return month.charAt(0).toUpperCase() + month.slice(1);
//                         },
//                         getYearsForSelect = function () {
//                             var now = moment(),
//                                 changeYearPast = Math.max(0, parseInt(scope.changeYearPast, 10) || 0),
//                                 changeYearFuture = Math.max(0, parseInt(scope.changeYearFuture, 10) || 0),
//                                 min = moment(scope.month).subtract(changeYearPast, 'year'),
//                                 max = moment(scope.month).add(changeYearFuture, 'year'),
//                                 result = [];
//                             max.add(1, 'year');
//                             for (var m = moment(min); max.isAfter(m, 'YEAR'); m.add(1, 'year')) {
//                                 if ((!scope.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!scope.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
//                                     result.push(m.format('YYYY'));
//                                 }
//                             }
//                             return result;
//                         };
//                     /*scope functions*/
//                     var watches = [];
//                     watches.push(
//                         scope.$watch('ngModel', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('month', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('highlightDays', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('weekDaysOff', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('allDaysOff', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('daysAllowed', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('disableDaysBefore', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('disableDaysAfter', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch(function () {
//                             return moment.locale();
//                         }, function () {
//                             scope.daysOfWeek = getDaysOfWeek();
//                             scope.monthToDisplay = getMonthYearToDisplay();
//                         }, true)
//                     );
//                     scope.$on('destroy', function () {
//                         for (var i = 0; i < watches.length; i++) {
//                             watches[i]();
//                         }
//                     });
//                     //default values
//                     scope.month = scope.month || moment().startOf('day');
//                     scope.days = [];
//                     scope.weekDaysOff = scope.weekDaysOff || [];
//                     scope.daysOff = scope.daysOff || [];
//                     scope.disableBackButton = false;
//                     scope.disableNextButton = false;
//                     scope.daysOfWeek = getDaysOfWeek();
//                     scope.cssDaysOfSurroundingMonths = scope.cssDaysOfSurroundingMonths || 'picker-empty';
//                     scope.yearsForSelect = [];
//                     /**
//                      * Called when user clicks a date
//                      * @param event event the click event
//                      * @param day "complex" mdp object with all properties
//                      */
//                     scope.toggleDay = function (event, day) {
//                         event.preventDefault();
//                         if (day.mdp.otherMonth && !scope.fireEventsForDaysOfSurroundingMonths) {
//                             return;
//                         }
//                         var prevented = false;
//                         event.preventDefault = function () {
//                             prevented = true;
//                         };
//                         if (typeof scope.dayClick == 'function') {
//                             scope.dayClick(event, day);
//                         }
//                         if (day.selectable && !prevented) {
//                             day.mdp.selected = !day.mdp.selected;
//                             if (day.mdp.selected) {
//                                 scope.ngModel.push(day.date);
//                             } else {
//                                 var idx = -1;
//                                 for (var i = 0; i < scope.ngModel.length; ++i) {
//                                     if (moment.isMoment(scope.ngModel[i])) {
//                                         if (scope.ngModel[i].isSame(day.date, 'day')) {
//                                             idx = i;
//                                             break;
//                                         }
//                                     } else {
//                                         if (scope.ngModel[i].date.isSame(day.date, 'day')) {
//                                             idx = i;
//                                             break;
//                                         }
//                                     }
//                                 }
//                                 if (idx !== -1) scope.ngModel.splice(idx, 1);
//                             }
//                         }
//                     };
//                     /**
//                      * Hover day
//                      * @param event hover event
//                      * @param day "complex" mdp object with all properties
//                      */
//                     scope.hoverDay = function (event, day) {
//                         event.preventDefault();
//                         var prevented = false;
//                         event.preventDefault = function () {
//                             prevented = true;
//                         };
//                         if (typeof scope.dayHover == 'function') {
//                             scope.dayHover(event, day);
//                         }
//                         if (!prevented) {
//                             day.mdp.hover = event.type === 'mouseover';
//                         }
//                     };
//                     /**
//                      * Right clicked on day
//                      * @param event Click event
//                      * @param day Day clicked
//                      */
//                     scope.rightClicked = function (event, day) {
//                         if (typeof scope.rightClick === 'function') {
//                             event.preventDefault();
//                             scope.rightClick(event, day);
//                         }
//                     };
//                     scope.getDayClasses = function (day) {
//                         var css = '';
//                         if (day.css && (!day.mdp.otherMonth || scope.showDaysOfSurroundingMonths)) {
//                             css += ' ' + day.css;
//                         }
//                         if (scope.cssDaysOfSurroundingMonths && day.mdp.otherMonth) {
//                             css += ' ' + scope.cssDaysOfSurroundingMonths;
//                         }
//                         if (day.mdp.selected) {
//                             css += ' picker-selected';
//                         }
//                         if (!day.selectable) {
//                             css += ' picker-off';
//                         }
//                         if (day.mdp.today) {
//                             css += ' today';
//                         }
//                         if (day.mdp.past) {
//                             css += ' past';
//                         }
//                         if (day.mdp.future) {
//                             css += ' future';
//                         }
//                         if (day.mdp.otherMonth) {
//                             css += ' picker-other-month';
//                         }
//                         return css;
//                     };
//                     /*Navigate to another month*/
//                     scope.changeMonth = function (event, disable, add) {
//                         if (disable) {
//                             return;
//                         }
//                         event.preventDefault();
//                         var prevented = false;
//                         event.preventDefault = function () {
//                             prevented = true;
//                         };
//                         var monthTo = moment(scope.month).add(add, 'month');
//                         if (typeof scope.monthClick == 'function') {
//                             scope.monthClick(event, monthTo);
//                         }
//                         if (!prevented) {
//                             var oldMonth = moment(scope.month);
//                             scope.month = monthTo;
//                             if (typeof scope.monthChanged == 'function') {
//                                 scope.monthChanged(scope.month, oldMonth);
//                             }
//                         }
//                     };
//                     /*Change year*/
//                     scope.changeYear = function (year) {
//                         scope.month = scope.month.year(parseInt(year, 10));
//                     };
//                     /*Check if the date is off : unselectable*/
//                     scope.isDayOff = function (day) {
//                         return scope.allDaysOff ||
//                             (!!scope.disableDaysBefore && moment(day.date).isBefore(scope.disableDaysBefore, 'day')) ||
//                             (!!scope.disableDaysAfter && moment(day.date).isAfter(scope.disableDaysAfter, 'day')) ||
//                             (angular.isArray(scope.weekDaysOff) && scope.weekDaysOff.some(function (dayOff) {
//                                 return day.date.day() === dayOff;
//                             })) ||
//                             (angular.isArray(scope.daysOff) && scope.daysOff.some(function (dayOff) {
//                                 return day.date.isSame(dayOff, 'day');
//                             })) ||
//                             (angular.isArray(scope.daysAllowed) && !scope.daysAllowed.some(function (dayAllowed) {
//                                 return day.date.isSame(dayAllowed, 'day');
//                             })) ||
//                             (angular.isArray(scope.highlightDays) && scope.highlightDays.some(function (highlightDay) {
//                                 return day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable;
//                             }));
//                     };
//                     /*Check if the date is selected*/
//                     scope.isSelected = function (day) {
//                         return scope.ngModel.some(function (d) {
//                             return day.date.isSame(d, 'day');
//                         });
//                     };
//                     /*Generate the calendar*/
//                     scope.generate = function () {
//                         scope.year = scope.month.year().toString();
//                         scope.yearsForSelect = getYearsForSelect();
//                         scope.monthToDisplay = getMonthYearToDisplay();
//                         scope.yearToDisplay = scope.month.format('YYYY');
//                         var previousDay = moment(scope.month).date(0).day(scope.sundayFirstDay ? 0 : 1).subtract(1, 'day');
//                         if (moment(scope.month).date(0).diff(previousDay, 'day') > 6) {
//                             previousDay = previousDay.add(1, 'week');
//                         }
//                         var firstDayOfMonth = moment(scope.month).date(1),
//                             days = [],
//                             now = moment(),
//                             lastDay = moment(firstDayOfMonth).endOf('month'),
//                             createDate = function () {
//                                 var day = {
//                                     date: moment(previousDay.add(1, 'day')),
//                                     mdp: {
//                                         selected: false
//                                     }
//                                 };
//                                 if (angular.isArray(scope.highlightDays)) {
//                                     var hlDay = scope.highlightDays.filter(function (d) {
//                                         return day.date.isSame(d.date, 'day');
//                                     });
//                                     day.css = hlDay.length > 0 ? hlDay[0].css : '';
//                                     day.title = hlDay.length > 0 ? hlDay[0].title : '';
//                                 }
//                                 day.selectable = !scope.isDayOff(day);
//                                 day.mdp.selected = scope.isSelected(day);
//                                 day.mdp.today = day.date.isSame(now, 'day');
//                                 day.mdp.past = day.date.isBefore(now, 'day');
//                                 day.mdp.future = day.date.isAfter(now, 'day');
//                                 if (!day.date.isSame(scope.month, 'month')) {
//                                     day.mdp.otherMonth = true;
//                                 }
//                                 return day;
//                             },
//                             maxDays = lastDay.diff(previousDay, 'days'),
//                             lastDayOfWeek = scope.sundayFirstDay ? 6 : 0;
//                         if (lastDay.day() !== lastDayOfWeek) {
//                             maxDays += (scope.sundayFirstDay ? 6 : 7) - lastDay.day();
//                         }
//                         for (var j = 0; j < maxDays; j++) {
//                             days.push(createDate());
//                         }
//                         scope.days = days;
//                         checkNavigationButtons();
//                     };
//                     scope.generate();
//                 }
//             };
//         }
//         ;
//     angular.module('multipleDatePicker', [])
//         .directive('multipleDatePicker', multipleDatePicker)
//         .directive('mdpRightClick', ['$parse', function ($parse) {
//             return function (scope, element, attrs) {
//                 var fn = $parse(attrs.mdpRightClick);
//                 element.bind('contextmenu', function (event) {
//                     scope.$apply(function () {
//                         fn(scope, {$event: event});
//                     });
//                 });
//             };
//         }]);
// })
// (window.angular); 
//# sourceMappingURL=multiple-date-picker.js.map
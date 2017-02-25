import { Component, Input, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment/moment';

@Component({
    moduleId: module.id,
    selector: 'multiple-date-picker',
    templateUrl: 'multiple-date-picker.html',
    styleUrls: ['multiple-date-picker.css'],
    providers: [
        { 
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => MultipleDatePicker),
          multi: true
        }
    ]
})
export class MultipleDatePicker implements OnInit, ControlValueAccessor {
    @Input() highlightDays: any;
    @Input() dayClick: string;
    @Input() dayHover: string;
    @Input() rightClick: string;
    //@Input() month: any;
    @Input() monthChanged: any;
    @Input() fontAwesome: boolean;
    @Input() matIcons: boolean;
    @Input() monthClick: string;
    @Input() weekDaysOff: any;
    @Input() allDaysOff: string;
    @Input() daysAllowed: any;
    @Input() disableNavigation: boolean;
    @Input() disallowBackPastMonths: boolean;
    @Input() disallowGoFuturMonths: string;
    @Input() showDaysOfSurroundingMonths: boolean;
    @Input() cssDaysOfSurroundingMonths: any = this.cssDaysOfSurroundingMonths || 'picker-empty';
    @Input() fireEventsForDaysOfSurroundingMonths: string;
    @Input() disableDaysBefore: boolean;
    @Input() disableDaysAfter: boolean;
    @Input() changeYearPast: string;
    @Input() changeYearFuture: string;
    arrow: number = 0;
    month = this.month || moment().startOf('day');  
    @Input() projectScope: any[] = [];
    days: any[] = [];
    _weekDaysOff: any = this._weekDaysOff || [];
    daysOff: any = this.daysOff || [];
    disableBackButton: any = false;
    disableNextButton: any = false;
    daysOfWeek: any[] = [];
    // _cssDaysOfSurroundingMonths: any = this._cssDaysOfSurroundingMonths || 'picker-empty';
    yearsForSelect: any = [];
    monthToDisplay: string;
    yearToDisplay: string;
    @Input() sundayFirstDay: boolean;

    constructor() { }

    ngOnInit(): void {
        this.generate();
        this.daysOfWeek = this.getDaysOfWeek();
        this.arrowSelected();
    }

    arrowSelected() {
        if (this.matIcons) {
            return this.arrow = 1;
        } else if (this.fontAwesome) {
            return this.arrow = 2;
        }
    }

    writeValue(value: any[]) {
        if (value !== undefined) {
            this.projectScope = value;
            if (value !== null) {
                this.projectScope = this.projectScope.map((val: Date) => {
                    return moment(val);
                });
                this.projectScope.forEach((val: Date) => {
                let day = val;
                this.days.forEach((d) => {
                    if(d.date.isSame(day)){
                        d.mdp.selected = true;
                        return;
                    }
                });
            });
            }
        }
    }
    propagateChange = (_: any) => {};
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    @Input() _projectScope: any[];
    get projectScope2() {
        return this._projectScope;
    }
    set projectScope2(val) {
        this._projectScope = val;
        this.propagateChange(this._projectScope);
    }
    checkNavigationButtons() {
        let today = moment(),
        previousMonth = moment(this.month).subtract(1, 'month'),
        nextMonth = moment(this.month).add(1, 'month');
        this.disableBackButton = this.disableNavigation || (this.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
        this.disableNextButton = this.disableNavigation || (this.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
    }
    getDaysOfWeek() {
        /*To display days of week names in moment.lang*/
        let momentDaysOfWeek = moment().localeData().weekdaysMin(),
            daysOfWeek = [];
        for (var i = 1; i < 7; i++) {
            daysOfWeek.push(momentDaysOfWeek[i]);
        }
        if (this.sundayFirstDay) {
            daysOfWeek.splice(0, 0, momentDaysOfWeek[0]);
        } else {
            daysOfWeek.push(momentDaysOfWeek[0]);
        }
        return daysOfWeek;
    }
    getMonthYearToDisplay() {
        let month = this.month.format('MMMM');
        return month.charAt(0).toUpperCase() + month.slice(1);
    }
    getYearsForSelect() {
        var now = moment(),
            changeYearPast = Math.max(0, parseInt(this.changeYearPast, 10) || 0),
            changeYearFuture = Math.max(0, parseInt(this.changeYearFuture, 10) || 0),
            min = moment(this.month).subtract(changeYearPast, 'year'),
            max = moment(this.month).add(changeYearFuture, 'year'),
            result = [];
        max.add(1, 'year');
        for (var m = moment(min); max.isAfter(m, 'year'); m.add(1, 'year')) {
            if ((!this.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!this.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
                result.push(m.format('YYYY'));
            }
        }
        return result;
    };
    toggleDay(event, day) {
        event.preventDefault();
        if (day.mdp.otherMonth && !this.fireEventsForDaysOfSurroundingMonths) {
            return;
        }
        let prevented = false;
        event.preventDefault = () => {
            prevented = true;
        }
        if (typeof this.dayClick == 'function') {
            this.dayClick(event, day);
        }
        if (day.selectable && !prevented) {
            day.mdp.selected = !day.mdp.selected;
            if (day.mdp.selected) {
                this.projectScope.push(day.date);
                // console.log('this project scope = ' + this.projectScope); // for testing keep!
            } else {
                let idx = -1;
                for (let i = 0; i < this.projectScope.length; ++i) {
                    if (moment.isMoment(this.projectScope[i])) {
                        if (this.projectScope[i].isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    } else {
                        if (this.projectScope[i].date.isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                }
                if (idx !== -1){
                    this.projectScope.splice(idx, 1);
                } 
            }
        }
        this.propagateChange(this.projectScope);
    }
    clearDays() {
        this.projectScope = [];
        this.generate();
         // console.log('clearDays was fired off'); // for testing
    }
    runGenerate() {
        this.generate();
    } // remove this and from html
    rightClicked(event, day) {
        if (typeof this.rightClick === 'function') {
            event.preventDefault();
            this.rightClick(event, day);
        }
    }
    getDayClasses(day) {
        let css = '';
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
            css += ' picker-off';
        }
        if (day.mdp.today) {
            css += ' today';
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
        return css;
    }
    
    /*Navigate to another month*/
    changeMonth(event, disable, add) {
        if (disable) {
            return;
        }
        event.preventDefault();
        let prevented = false;
        event.preventDefault = () => {
            // console.log('entered into preventDefault *****'); // for testing
            prevented = true;
        }
        let monthTo = moment(this.month).add(add, 'month');
        if (typeof this.monthClick == 'function') {
            this.monthClick(event, monthTo);
        }
        if (!prevented) {
            let oldMonth = moment(this.month);
            this.month = monthTo;
            if (typeof this.monthChanged == 'function') {
                this.monthChanged(this.month, oldMonth);
            }
            this.generate();
        }
    }

    /*Change year*/
    changeYear(year) {
        this.month = this.month.year(parseInt(year, 10));
    };

    /*Check if the date is off : unselectable*/
    isDayOff(day) {
        return this.allDaysOff ||
            (this.disableDaysBefore && moment(day.date).isBefore(moment(), 'day')) ||
            (!!this.disableDaysAfter && moment(day.date).isAfter(this.disableDaysAfter, 'day')) ||
            ((this.weekDaysOff === Array) && this.weekDaysOff.some(function (dayOff) {
                return day.date.day() === dayOff;
            })) ||
            ((this.daysOff === Array) && this.daysOff.some(function (dayOff) {
                return day.date.isSame(dayOff, 'day');
            })) ||
            ((this.daysAllowed === Array) && !this.daysAllowed.some(function (dayAllowed) {
                return day.date.isSame(dayAllowed, 'day');
            })) ||
            ((this.highlightDays === Array) && this.highlightDays.some(function (highlightDay) {
                return day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable;
            }));
    }

    /*Check if the date is selected*/
    isSelected(day) {
        return this.projectScope.some(function (d) {
            return day.date.isSame(d, 'day');
        });
    }

    /*Generate the calendar*/
    generate() {
        let year = this.month.year().toString();
        this.yearsForSelect = this.getYearsForSelect();
        this.monthToDisplay = this.getMonthYearToDisplay();
        this.yearToDisplay = this.month.format('YYYY');
        let previousDay = moment(this.month).date(0).day(this.sundayFirstDay ? 0 : 1).subtract(1, 'day');

        if (moment(this.month).date(0).diff(previousDay, 'day') > 6) {
            previousDay = previousDay.add(1, 'week');
        }
        let firstDayOfMonth = moment(this.month).date(1),
            days = [],
            now = moment(),
            lastDay = moment(firstDayOfMonth).endOf('month'),
            createDate = () => {
                let day = {
                    selectable: true,
                    date: moment(previousDay.add(1, 'day')),
                    css: '',
                    title: '',
                    mdp: {
                        selected: false,
                        today: false,
                        past: true,
                        future: true,
                        otherMonth: false
                    },
                }
                if ((this.highlightDays === Array)) {
                    var hlDay = this.highlightDays.filter(function (d) {
                        return day.date.isSame(d.date, 'day');
                    });
                    day.css = hlDay.length > 0 ? hlDay[0].css : '';
                    day.title = hlDay.length > 0 ? hlDay[0].title : '';
                }
                day.selectable = !this.isDayOff(day);
                // console.log('this.sameDaySelect() = ' + this.isSelected(day));
                day.mdp.selected = this.isSelected(day);
                day.mdp.today = day.date.isSame(now, 'day');
                day.mdp.past = day.date.isBefore(now, 'day');
                day.mdp.future = day.date.isAfter(now, 'day');
                if (!day.date.isSame(this.month, 'month')) {
                    day.mdp.otherMonth = true;
                }
                return day;
            }
            let maxDays = lastDay.diff(previousDay, 'days'),
            lastDayOfWeek = this.sundayFirstDay ? 6 : 0;
        if (lastDay.day() !== lastDayOfWeek) {
            maxDays += (this.sundayFirstDay ? 6 : 7) - lastDay.day();
        }
        for (var j = 0; j < maxDays; j++) {
            days.push(createDate());
        }
        this.days = days;
        this.checkNavigationButtons();

        this.propagateChange(this.projectScope);
    }
    findArrayofDays() {
        console.log('this.projectScope = ' + this.projectScope);
    }
}

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
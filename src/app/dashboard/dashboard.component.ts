import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/index';
import { HeroService } from '../services/index';

import { MultipleDatePicker, DateRangeHelper } from '../multiple-date-picker/index';
import * as moment from 'moment/moment';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, AfterViewInit { 

    heroes: Hero[] = [];
    @Input() title: string;
    highlightDays: any[];
    initialCount: Array<any>;
    @Input() charles: string = 'Christian';
    selectedDays: Array<Date>;
    datesArray: Array<any>;
    myMonth: any;

    testItems: any[] = [
        {'item': 'array1', 'id': 1},
        {'item': 'array2', 'id': 2},
        {'item': 'array3', 'id': 3},
    ]  // potential use if person wanted to create a choosen item to associate with a list of arrays

    constructor(
        private router: Router,
        private heroService: HeroService
    ) { }

    @ViewChild(MultipleDatePicker)
    private multipleDatePicker: MultipleDatePicker;

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
            //console.log('this is here = ' + matIcons);
        
        // set array to either [] or the following values like example below
         this.highlightDays = [
            {date: moment().date(22).valueOf(), css: 'holiday', selectable: false, title: 'Holiday time !'},
            {date: moment().date(25).valueOf(), css: 'off', selectable: false, title: 'We don\'t work today'},
            {date: moment().date(30).valueOf(), css: 'birthday', selectable: true, title: 'I\'m thir... i\'m 28, seriously, I mean ...'}
         ];

         console.log('date: moment().date(19).valueOf() ', moment().date(19).valueOf());
         console.log('date: moment().date(20).valueOf() ', moment().date(20).valueOf());
         console.log('date: moment().date(21).valueOf() ', moment().date(21).valueOf());


        this.initialCount = [];
        
        // enter variables for startDates and End dates
        let startDate = 1509768000000; // enter variable or ms value
        let endDate = 1510722000000; // enter variable or ms value // 1502510400000

        // console.log('calucator values ' + this.dateRangeHelper.dateRangeDaysCalculator(endDate, startDate))

        if (DateRangeHelper.dateRangeDaysCalculator(endDate, startDate) >= 0) {
            let days = DateRangeHelper.dateRangeDaysCalculator(endDate, startDate);
            this.datesArray = DateRangeHelper.getDates(new Date(startDate), (new Date(startDate)).addDays(days)); // date object used not moment in this case
            console.log('this.datesArray ', this.datesArray);
        }

        // takes array dates from daterangehelper and adds them to highlighted days for date picker day highlights
        if (this.datesArray !== undefined && this.datesArray.length > 0) {
            let daysArray = this.datesArray;
            let arrayObject = daysArray.find(x => x);
            let arrayKeys = Object.keys(daysArray);
            if (arrayObject !== undefined && arrayKeys.length > 0) {
                this.highlightDays = this.datesArray;
                let stayNames = 'Christian Smith' // should be set to variable 
                for (let i in daysArray) {
                    if (true) {
                        this.highlightDays.push({date: daysArray[i], css: 'stay-dates', selectable: true, title: `days off for ${stayNames}`});  // set strings
                    }
                }
            }
        }
        
        // calculate addional months to add onto the month object... if this is corrupt in anyway it will default to todays month info
        let monthsFromToday = DateRangeHelper.dateRangeMonthsCalculator(startDate);
        if (monthsFromToday > 0) {
            // this.myMonth = moment().add(monthsFromToday, 'months');
        } else {
            this.myMonth = moment().startOf('day');
        }
        

    }

    ngAfterViewInit() {
        this.initialCount = [];
        console.log(' i was there in AfterViewInit ');
    }
 
     findArrayFn(){
         // day is from mdp's scope of finArrayofDays(day) function 
         this.multipleDatePicker.findArrayofDays();
        console.log('this is the findArrayofDays() function = ' + this.multipleDatePicker.findArrayofDays);
     }

    runGenerateFn(){
        // day is from mdp's scope of finArrayofDays(day) function 
        this.multipleDatePicker.runGenerate();
        console.log('this is the runGenerate() function = ' + this.multipleDatePicker.runGenerate);
    }

    
    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }

    getNewValue(){
        console.log('this is the new initial value 99999 = ' + this.initialCount)
    }

    arrayMock1() {
        this.initialCount = ["Tue Feb 28 2017 00:00:00 GMT-0500"];
    }

    arrayMock2() {
        this.initialCount = [1488171600000];
    }

    arrayMock3() {
        this.initialCount = [1,2,3,3,4,5,6,7,8,9];
    }
    
    fireClearDays() {
        console.log('this is the new initial value BEFORE = ' + this.initialCount)
        this.multipleDatePicker.clearDays();
        console.log('this is the new initial value AFTER = ' + this.initialCount)
    }
    
    logMonthChanged(newMonth, oldMonth) {
        alert( 'a new month : ' + newMonth.format('YYYY-M-DD') + ' || old month : ' + oldMonth.format('YYYY-M-DD') );
        console.log('what is newMonth = ' + newMonth);
    }  // future test case shelf for now. regarding change month

    // this is the code needed for only one day selection.... 
    // This.initialCount is the [(ngmodel)] of the projectScope array;
    oneDaySelectionOnly = (event: Event, date: Date) => {
        this.initialCount.length = 0;
    };

}
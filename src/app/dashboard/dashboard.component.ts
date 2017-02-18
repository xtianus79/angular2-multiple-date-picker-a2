import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/index';
import { HeroService } from '../services/index';

import { MultipleDatePicker } from '../multiple-date-picker/index';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, AfterViewInit { 

    heroes: Hero[] = [];
    @Input() title: string;
    initialCount: any[] = [1487826000000,1487739600000,1488171600000,1481950800000,1488085200000,1480741200000,1487998800000,1489550400000,1481778000000];
    @Input() charles: string = 'Christian';

    testItems: any[] = [
        {'item': 'array1', 'id': 1},
        {'item': 'array2', 'id': 2},
        {'item': 'array3', 'id': 3},
    ]  // potential use if person wanted to create a choosen item to associate with a list of arrays

    constructor(
        private router: Router,
        private heroService: HeroService,
        //public multipleDatePicker: MultipleDatePicker
    ) {}

    @ViewChild(MultipleDatePicker)
    private multipleDatePicker: MultipleDatePicker;

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
            console.log('this is here');
    }

    ngAfterViewInit() {
        console.log('i was there in AfterViewInit');
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
        this.initialCount = [1,2,3,4,5,6,1480741200000,1487998800000,1489550400000,1481778000000];
    }

    arrayMock2() {
        this.initialCount = [1,2,3,1488171600000,1481950800000,1488085200000,1480741200000,1487998800000,1489550400000,1481778000000];
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
    

}
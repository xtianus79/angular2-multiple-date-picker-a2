import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit { 

    heroes: Hero[] = [];
    initialCount: any[] = [];

    constructor(
        private router: Router,
        private heroService: HeroService,
        public multipleDatePicker: MultipleDatePicker
    ) {}

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }
 
     findArray(){
        console.log(this.multipleDatePicker.projectScope)
     }
    

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }

    getNewValue(){
        console.log('this is the new initial value 99999 = ' + this.initialCount)
    }

}
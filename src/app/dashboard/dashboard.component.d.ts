import { OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../models/index';
import { HeroService } from '../services/index';
export declare class DashboardComponent implements OnInit, AfterViewInit {
    private router;
    private heroService;
    heroes: Hero[];
    title: string;
    initialCount: any[];
    charles: string;
    testItems: any[];
    constructor(router: Router, heroService: HeroService);
    private multipleDatePicker;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    findArrayFn(): void;
    runGenerateFn(): void;
    gotoDetail(hero: Hero): void;
    getNewValue(): void;
    arrayMock1(): void;
    arrayMock2(): void;
    arrayMock3(): void;
    fireClearDays(): void;
    logMonthChanged(newMonth: any, oldMonth: any): void;
}

import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../models/index';
import { HeroService } from '../services/index';
export declare class HeroesComponent implements OnInit {
    private router;
    private heroService;
    heroes: Hero[];
    selectedHero: Hero;
    constructor(router: Router, heroService: HeroService);
    getHeroes(): void;
    ngOnInit(): void;
    onSelect(hero: Hero): void;
    gotoDetail(): void;
}

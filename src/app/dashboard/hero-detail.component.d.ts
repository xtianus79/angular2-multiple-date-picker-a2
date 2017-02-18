import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/index';
import { Hero } from '../models/index';
export declare class HeroDetailComponent implements OnInit {
    private heroService;
    private route;
    private location;
    constructor(heroService: HeroService, route: ActivatedRoute, location: Location);
    ngOnInit(): void;
    goBack(): void;
    hero: Hero;
}

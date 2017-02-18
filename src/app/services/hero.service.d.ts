import { Hero } from '../models/index';
export declare class HeroService {
    getHeroes(): Promise<Hero[]>;
    getHeroesSlowly(): Promise<Hero[]>;
    getHero(id: number): Promise<Hero>;
}

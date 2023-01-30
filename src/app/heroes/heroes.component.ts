import { Component } from '@angular/core';
import { ApolloBase, Apollo } from 'apollo-angular';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { map, Observable, Subscription } from 'rxjs';
import gql from 'graphql-tag';
import { GraphqlService } from '../graphql.service';

const GET_HERO_ID = gql`
{
  heroes {
    id
    firstName
  }
}
`;

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent {
  heroes: Hero[] = [];
  author: any;
  error: any;
  loading: any;
  hero: any;

  constructor(private heroService: HeroService, private graphqlService: GraphqlService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return;}
    this.graphqlService.addHero(name);
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  getHeroes(): void {
    this.graphqlService.getHeroes()
      .subscribe(data => this.heroes = data.heroes);
  }
}



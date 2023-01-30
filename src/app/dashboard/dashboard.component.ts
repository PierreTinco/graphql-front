import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../graphql.service';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.graphqlService.getHeroes()
      .subscribe(data => this.heroes = data.heroes);
  }
}
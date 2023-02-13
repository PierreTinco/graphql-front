import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GraphqlService } from '../service/graphql.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private graphqlService: GraphqlService
  ) {}

  ngOnInit(): void {
    this.getHeroById();
  }
  
  getHeroById(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.graphqlService.getHeroById(id).subscribe(data => { this.hero = data.heroById; });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // if (this.hero) {
    //   this.heroService.updateHero(this.hero)
    //     .subscribe(() => this.goBack());
    // }
  }
  
}

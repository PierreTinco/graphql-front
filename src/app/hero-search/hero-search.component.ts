import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


import { GraphqlService } from '../service/graphql.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private graphqlService: GraphqlService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    //this.searchTerms.next(term);
    console.log("test search fct", typeof  term);
    this.graphqlService.getHeroByName(term).subscribe(data => this.heroes$ = data);
  }

  ngOnInit(): void {
    // this.heroes$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((name: string) => this.graphqlService.getHeroByName(name)),
    // );
  }
}
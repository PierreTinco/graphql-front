import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Hero } from '../hero';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  getHeroById(id: number): Observable<any> {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          heroById(id: ${id}) {
              id
              name
              power
          }
        }
      `
      })
      .valueChanges.pipe(
        map(result => {          
          return result.data;
        })
      );
  }

  getHeroByName(name: string): Observable<any> {
    if (!name.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.apollo
      .watchQuery({
        query: gql`
        {
          heroByName(name: ${name}) {
              id
              name
              power
          }
        }
      `
      })
      .valueChanges.pipe(
        map(result => {
          return result.data;
        })
      );
  }

  getHeroes(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: gql`
        {
          heroes {
            id
            name
          }
        }
      `
      })
      .valueChanges.pipe(
        map(result => {
          return result.data;
        })
      );
  }

  addHero(name: string): void {
    const newHero = {
      name: name,
    }
    this.apollo
      .mutate({
        mutation: gql`
          mutation addHero($hero: HeroInput!){
            addHero(hero: $hero) {
              id
              name
              power
            }
          }    
        `,
        variables: {hero: newHero}
      })
      .subscribe()
  }

  deleteHero(heroId : number) {
    this.apollo
    .mutate({
      mutation: gql`
        mutation deleteHero($id: ID!) {
          deleteHero(id: $id)
        }    
      `,
      variables: {id: heroId}
    })
    .subscribe()
  }
}

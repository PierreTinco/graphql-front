import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  getHeroById(id: any): Observable<any> {
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

  addHero(heroName: String): void {
    this.apollo
      .mutate({
        mutation: gql`
          mutation addHero($name: String){
            addHero(name: $name) {
              name
              power
            }
          }    
        `,
        variables: {name: heroName},
      })
      .subscribe()
  }
}

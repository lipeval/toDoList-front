import { IronTrelloGenericResponse } from './interfaces';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Card } from './../card/card.model';

@Injectable()
export class CardService {

  CARD_ROUTE = '/card';
  ENPOINT: string;
  cards: Array<Card> = [];

  constructor(
    @Inject('BASE_ENDPOINT') private BASE,
    @Inject('API_ENDPOINT') private API,
    private http: Http
  ) {
    this.ENPOINT = this.BASE + this.API;
  }

  create(card): Observable<Card> {
    return this.http.post(`${this.ENPOINT}${this.CARD_ROUTE}/`, card)
      .map((res) => res.json())
      .map((newCard) => new Card(newCard))
      .catch((err) => Observable.throw(err.json()));
  }

 
  edit(card: Card) {
    return this.http.put(`${this.ENPOINT}${this.CARD_ROUTE}/${card._id}`, card)
      .map((res) => res.json().card)
      .map((_card) => {
        card = new Card(_card);
        return card;
      })
      .catch((err) => Observable.throw(err.json()));
  }

 
  transfer(card: Card, from, to) {
    const body = {
      card,
      from,
      to
    };
    return this.http.put(`${this.ENPOINT}${this.CARD_ROUTE}/transfer/${card._id}`, body)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }

  
  remove(card: Card): Observable<IronTrelloGenericResponse> {
    return this.http.delete(`${this.ENPOINT}${this.CARD_ROUTE}/${card._id}`)
      .map((res) => res.json())
      .catch((err) => Observable.throw(err.json()));
  }
}
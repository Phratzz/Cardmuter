// shared service to handle rendering and data for canvas field

import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { BehaviorSubject, Observable, map, merge, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
    private _card: BehaviorSubject<Card> = new BehaviorSubject<Card>(new Card());
    public readonly card: Observable<Card> = this._card.asObservable();

    constructor() {

    }

    newCard(data: Card) {
        this._card.next(data);
    }
}
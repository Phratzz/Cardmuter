// shared service to handle rendering and data for canvas field

import { Injectable } from '@angular/core';
import { PF2Card } from '../models/pf2.card.model';
import { BehaviorSubject, Observable, map, merge, tap } from 'rxjs';
import { PF2AltCard } from '../models/pf2-alt.card.model';

@Injectable({
  providedIn: 'root'
})
export class RenderService {
    private _card: BehaviorSubject<PF2Card | PF2AltCard> = new BehaviorSubject<PF2Card | PF2AltCard>(new PF2Card());
    public readonly card: Observable<PF2Card | PF2AltCard> = this._card.asObservable();

    constructor() {

    }

    newCard(data: PF2Card | PF2AltCard) {
        this._card.next(data);
    }
}
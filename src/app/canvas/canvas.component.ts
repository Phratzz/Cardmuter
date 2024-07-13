import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { PF2Card } from '../models/pf2.card.model';
import { RenderService } from '../services/render.service';
import { PF2AltCard } from '../models/pf2-alt.card.model';
import { PF2CardRenderer } from './renderer/pf2.renderer';
import { PF2AltCardRenderer } from './renderer/pf2alt.renderer';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent {
	@ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

	vars = {
		type: 'Major',
		level: 17,
		cost: '1250gp',
		bonus: '+3',
		damage: "4d8",
		splash: "4",
	}

	data: PF2Card | PF2AltCard
	renderer: PF2CardRenderer | PF2AltCardRenderer
	
	assets: any

	constructor(
		renderService: RenderService,
	) {
		renderService.card.subscribe((card) => {
			if(card instanceof PF2Card) {
				this.renderer = new PF2CardRenderer(card, this.canvas)
			} else if(card instanceof PF2AltCard) {
				this.renderer = new PF2AltCardRenderer(card, this.canvas)
			}

			this.data = card
			this.renderer.render()
		})
	}
}

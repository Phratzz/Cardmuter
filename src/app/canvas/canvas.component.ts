import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Card, CardBodyFluff, CardBodyText, CardBodyAbility, CardTrait } from '../models/card.model';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
	@ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

	data = new Card(
		'item',
		'Lover\'s Knot',
		'Item 2',
		[
			new CardTrait('Uncommon', 'uncommon'),
			new CardTrait('Consumable'),
			new CardTrait('Magical'),
			new CardTrait('Talisman'),
			new CardTrait('Healing'),
			new CardTrait('Necromancy'),
		],
		[
			[
				{name: 'Usage', value: 'affixed to armor'},
			],
			[
				{name: 'Bulk', value: '—'},
			],
			[
				{name: 'Price', value: '6gp'},
			],
		],
		[
			new CardBodyFluff('This lock of hair is wrapped around a twig twisted into the shape of a heart. Popular among many of Restov\'s explorers, traders, and mercenaries, often a person carries several lover\'s knots on their person in case of emergency.'),
			new CardBodyFluff('While the original lover\'s knots were specific rewards granted by a particularly flirtatious Swordlord to her favored agents, time has seen these talismans become much more widespread through southern Brevoy'),
			new CardBodyAbility({
				activate: 'Envision', activateAction: '1',
				requirement: 'You are trained in Medicine',
				effect: 'You regain 2d6 Hit Points, if you have the Battle Medicine feat, you instead gain 2d6+7 Hit Points',
			}),
		],
	)
	
	config = {
		size: {
			width: 1748,
			height: 2480,
			
			textMargin: 10,

			titleFontSize: 90,
			titleFontOffset: 70,
			textContainerOffset: 90,
			lineWidth: 5,

			traitAccentWidth: 16,
			traitAccentHeight: 6,
			traitColorWidth: 32,
			traitColorHeight: 12,
			traitFontSize: 70,

			bodyFontSize: 52,
		},
		colors: {
			spell: '#5d0000',
			item: '#00005d',
			creature: '#005d00',
			accent: '#dac68a',
			traits: {
				common: '#58180d',
				uncommon: '#98513d',
				rare: '#002664',
				unique: '#002664',
				alignment: '#576293',
				size: '#3b7b59',
				weapon: '#505050',
			}
		},
	};

	assets: any

	// make observable
	assetsLoaded = false;

	ngOnInit() {
		this.assets = {
			paperImage: new Image(),
			fontNormal: new FontFace('GoodPro', 'url(assets/fonts/GoodPro.ttf)'),
			fontBold: new FontFace('GoodPro-Bold', 'url(assets/fonts/GoodPro-Bold.ttf)'),
			fontItalic: new FontFace('GoodPro-Italic', 'url(assets/fonts/GoodPro-Italic.ttf)'),
			fontCondBold: new FontFace('GoodPro-CondBold', 'url(assets/fonts/GoodPro-CondBold.ttf)'),
			fontAction: new FontFace('PF2-Action', 'url(assets/fonts/PF2-Action.ttf)'),
		}
		this.assets.paperImage.src = 'assets/paper-texture.jpg';

		// create promise to wait for image to load
		const imagePromise = this.createPromise();
		this.assets.paperImage.onload = () => {
			imagePromise.done();
		}

		// load fonts and image		
		Promise.all([
			this.assets.fontNormal.load(),
			this.assets.fontBold.load(),
			this.assets.fontItalic.load(),
			this.assets.fontCondBold.load(),
			this.assets.fontAction.load(),
			imagePromise.wait(),
		]).then((fonts) => {
			this.assetsLoaded = true;
			this.render();
		});
	}

	render() {
		const ctx = this.canvas.nativeElement.getContext('2d')

		if (!ctx) {
			throw new Error('Could not get 2d context from canvas');
		}

		ctx.canvas.width = this.config.size.width;
		ctx.canvas.height = this.config.size.height;

		let offset = 0;

		// draw title
		offset = this.renderTitle(ctx, offset);
		offset = this.renderLine(ctx, offset);

		// draw traits and header
		offset = this.renderTraits(ctx, offset);
		offset = this.renderHeader(ctx, offset);
		offset = this.renderLine(ctx, offset);

		// draw content
		offset = this.renderBody(ctx, offset);

		// draw frame
		this.renderFrame(ctx);
	}

	private renderFrame(ctx: CanvasRenderingContext2D) {
		let offset: number
		let radius: number

		const paperTexture = 'assets/paper-texture.jpg';
		const paperImage = new Image();
		paperImage.src = paperTexture;
		paperImage.onload = () => {
			// set globalCompositeOperation to destination-over so that the frame is drawn behind the content
			ctx.globalCompositeOperation = 'destination-over';

			
			// draw rounded rectangle in paper texture
			offset = 50
			radius = 75
			const pattern = ctx.createPattern(paperImage, 'no-repeat');
			if(!pattern) {
				throw new Error('Could not create pattern from image');
			}

			ctx.fillStyle = pattern;
			this.drawRoundedRect(ctx, offset, offset, this.config.size.width - offset * 2, this.config.size.height - offset * 2, radius);


			// draw rounded rectangle in accent color
			offset = 40
			radius = 75
			ctx.fillStyle = this.config.colors.accent;
			this.drawRoundedRect(ctx, offset, offset, this.config.size.width - offset * 2, this.config.size.height - offset * 2, radius);


			// draw frame color
			ctx.fillStyle = this.config.colors[this.data.frame];
			ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

			// reset globalCompositeOperation
			ctx.globalCompositeOperation = 'source-over';
		}
	}

	private renderTitle(ctx: CanvasRenderingContext2D, offset: number) {
		const titleFont = 'GoodPro-CondBold';
		const titleFontColor = '#000';
		const titleFontBaseline = 'top';
		
		const titleTitleAlign = 'left';
		const titleTypeAlign = 'right';

		ctx.font = `${this.config.size.titleFontSize}px ${titleFont}`;
		ctx.fillStyle = titleFontColor;
		ctx.textAlign = titleTitleAlign;
		ctx.textBaseline = titleFontBaseline;
		ctx.fillText(this.data.name.toUpperCase(), this.config.size.textContainerOffset, this.config.size.titleFontOffset);

		ctx.textAlign = titleTypeAlign;
		ctx.fillText(this.data.type.toUpperCase(), this.config.size.width - this.config.size.textContainerOffset, this.config.size.titleFontOffset);

		return offset + this.config.size.titleFontSize + this.config.size.titleFontOffset + this.config.size.textMargin;
	}

	private renderLine(ctx: CanvasRenderingContext2D, offset: number) {
		const lineColor = '#000';

		ctx.beginPath();
		ctx.moveTo(this.config.size.textContainerOffset, offset);
		ctx.lineTo(this.config.size.width - this.config.size.textContainerOffset, offset);
		ctx.lineWidth = this.config.size.lineWidth;
		ctx.strokeStyle = lineColor;
		ctx.stroke();

		return offset + this.config.size.lineWidth + this.config.size.textMargin;
	}

	private renderTraits(ctx: CanvasRenderingContext2D, offset: number) {
		const traitsFont = 'GoodPro-CondBold';
		const traitsFontColor = '#fff';
		const traitsFontBaseline = 'top';
		const traitsFontAlign = 'left';

		// foreach trait
		let traitOffset = this.config.size.textContainerOffset;
		this.data.traits.forEach((trait, index) => {
			// figure out how much space we need for the trait due to the font size
			ctx.font = `${this.config.size.traitFontSize}px ${traitsFont}`;
			let traitTextWidth = ctx.measureText(trait.name.toUpperCase()).width;

			// if this would bring us over the edge, start a new line
			if (traitOffset + this.config.size.traitAccentWidth * 2 + this.config.size.traitColorWidth * 2 + traitTextWidth > this.config.size.width - this.config.size.textContainerOffset) {
				traitOffset = this.config.size.textContainerOffset;
				offset += this.config.size.traitAccentHeight * 2 + this.config.size.traitColorHeight * 2 + this.config.size.traitFontSize + this.config.size.textMargin;
			}

			// draw the accent color
			ctx.fillStyle = this.config.colors.accent;
			ctx.fillRect(
				traitOffset,
				offset,
				this.config.size.traitAccentWidth * 2 + this.config.size.traitColorWidth * 2 + traitTextWidth,
				this.config.size.traitAccentHeight * 2 + this.config.size.traitColorHeight * 2 + this.config.size.traitFontSize
			);

			// draw the trait color
			ctx.fillStyle = this.config.colors.traits[trait.type];
			ctx.fillRect(
				traitOffset + this.config.size.traitAccentWidth,
				offset + this.config.size.traitAccentHeight,
				this.config.size.traitColorWidth * 2 + traitTextWidth,
				this.config.size.traitColorHeight * 2 + this.config.size.traitFontSize
			);

			// draw the trait text
			ctx.font = `${this.config.size.traitFontSize}px ${traitsFont}`;
			ctx.fillStyle = traitsFontColor;
			ctx.textAlign = traitsFontAlign;
			ctx.textBaseline = traitsFontBaseline;
			ctx.fillText(
				trait.name.toUpperCase(),
				traitOffset + this.config.size.traitAccentWidth + this.config.size.traitColorWidth,
				offset + this.config.size.traitAccentHeight + this.config.size.traitColorHeight,
			);

			// update offset
			traitOffset += this.config.size.traitAccentWidth * 2 + this.config.size.traitColorWidth * 2 + traitTextWidth + this.config.size.textMargin;
		})

		return offset + this.config.size.traitAccentHeight * 2 + this.config.size.traitColorHeight * 2 + this.config.size.traitFontSize + this.config.size.textMargin;
	}

	private renderHeader(ctx: CanvasRenderingContext2D, offset: number) {
		const headerFont = 'GoodPro';
		const headerFontBold = 'GoodPro-Bold';
		const headerFontColor = '#000';
		const headerFontBaseline = 'top';
		const headerFontAlign = 'left';

		ctx.fillStyle = headerFontColor;
		ctx.textAlign = headerFontAlign;
		ctx.textBaseline = headerFontBaseline;

		this.data.header.forEach((header, index) => {
			let horizontalOffset = this.config.size.textContainerOffset;
			header.forEach((headerItem, index) => {
				// if its not the first item, add a ";" break
				if (index > 0) {
					ctx.font = `${this.config.size.bodyFontSize}px ${headerFont}`;
					ctx.fillText(';', horizontalOffset, offset);
					horizontalOffset += ctx.measureText(';').width + this.config.size.textMargin;
				}

				// write name
				ctx.font = `${this.config.size.bodyFontSize}px ${headerFontBold}`;
				ctx.fillText(headerItem.name, horizontalOffset, offset);
				horizontalOffset += ctx.measureText(headerItem.name).width + this.config.size.textMargin;

				// write value
				ctx.font = `${this.config.size.bodyFontSize}px ${headerFont}`;
				ctx.fillText(headerItem.value, horizontalOffset, offset);
				horizontalOffset += ctx.measureText(headerItem.value).width;
			})

			offset += this.config.size.bodyFontSize;
		})

		return offset + this.config.size.textMargin;
	}

	private renderBody(ctx: CanvasRenderingContext2D, offset: number) {
		this.data.body.forEach((bodyItem, index) => {
			if (bodyItem instanceof CardBodyFluff) {
				offset = this.renderBodyFluff(ctx, offset, bodyItem);
			} else if (bodyItem instanceof CardBodyText) {
				offset = this.renderBodyText(ctx, offset, bodyItem);
			} else if (bodyItem instanceof CardBodyAbility) {
				offset = this.renderBodyAbility(ctx, offset, bodyItem);
			}
		})

		return offset;
	}

	private renderBodyFluff(ctx: CanvasRenderingContext2D, offset: number, bodyItem: CardBodyFluff) {
		const bodyFont = 'GoodPro-Italic';
		const bodyFontColor = '#000';
		const bodyFontBaseline = 'top';
		const bodyFontAlign = 'left';

		ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
		ctx.fillStyle = bodyFontColor;
		ctx.textAlign = bodyFontAlign;
		ctx.textBaseline = bodyFontBaseline;

		offset = this.drawText(
			ctx,
			bodyItem.text,
			offset,
			0,
			0,
		)

		return offset + this.config.size.bodyFontSize;
	}

	private renderBodyText(ctx: CanvasRenderingContext2D, offset: number, bodyItem: CardBodyText) {
		const bodyFont = 'GoodPro';
		const bodyFontColor = '#000';
		const bodyFontBaseline = 'top';
		const bodyFontAlign = 'left';

		ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
		ctx.fillStyle = bodyFontColor;
		ctx.textAlign = bodyFontAlign;
		ctx.textBaseline = bodyFontBaseline;

		offset = this.drawText(
			ctx,
			bodyItem.text,
			offset,
			0,
			0,
		)

		return offset + this.config.size.bodyFontSize;
	}

	private renderBodyAbility(ctx: CanvasRenderingContext2D, offset: number, bodyItem: CardBodyAbility) {
		const bodyFont = 'GoodPro';
		const bodyFontBold = 'GoodPro-Bold';
		const bodyFontAction = 'PF2-Action';
		const bodyFontColor = '#000';
		const bodyFontBaseline = 'top';
		const bodyFontAlign = 'left';

		ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
		ctx.fillStyle = bodyFontColor;
		ctx.textAlign = bodyFontAlign;
		ctx.textBaseline = bodyFontBaseline;

		const writingOrder = [
			'activate',
			'requirement',
			'frequency',
			'trigger',
			'effect',
		]
		writingOrder.forEach((key, index) => {
			let value = bodyItem[key as keyof CardBodyAbility];
			if(!value) {
				return;
			}

			// if string array, join with ", " and suround with "()"
			if(Array.isArray(value)) {
				value = `(${value.join(', ')})`;
			}

			let textOffset = 0;

			// write key in bold
			const keyValue = `${key[0].toUpperCase()}${key.slice(1)}`;
			ctx.font = `${this.config.size.bodyFontSize}px ${bodyFontBold}`;
			ctx.fillText(keyValue, this.config.size.textContainerOffset, offset);
			textOffset += ctx.measureText(keyValue).width;

			// write spacing
			ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
			ctx.fillText(" - ", this.config.size.textContainerOffset + textOffset, offset);
			textOffset += ctx.measureText(" - ").width;

			// if action, check if there is an action
			if(key === 'activate' && bodyItem.activateAction) {
				ctx.font = `${this.config.size.bodyFontSize}px ${bodyFontAction}`;
				ctx.fillText(bodyItem.activateAction, this.config.size.textContainerOffset + textOffset, offset);
				textOffset += ctx.measureText(bodyItem.activateAction).width;

				// write spacing
				ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
				ctx.fillText(" ", this.config.size.textContainerOffset + textOffset, offset);
				textOffset += ctx.measureText(" ").width;
			}

			ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
			offset = this.drawText(
				ctx,
				value,
				offset,
				60,
				60 - textOffset,
			)
		})

		return offset + this.config.size.bodyFontSize;
	}

	private drawText(ctx: CanvasRenderingContext2D, text: string, offset: number, horizontalOffset: number, horizontalOffsetFirstLine: number = 0 ) {
		const containerWidth = this.config.size.width - this.config.size.textContainerOffset * 2;
		let paragraphs = text.split(/\r\n|\r|\n/);
		paragraphs.forEach((paragraph, index) => {

			let words = paragraph.split(' ');
			let line:string[] = [];
			let lineLength = 0;
			let firstWordOfLine = true;
			let firstLine = true;

			const lineOffset = ()=> { return horizontalOffset - (firstLine ? horizontalOffsetFirstLine : 0) }
			const spaceWidth = ctx.measureText(' ').width;

			words.forEach((word, index) => {
				// if the word is too long to fit on the line, break it
				const wordLength = ctx.measureText(word).width;

				if (wordLength + lineLength + (firstWordOfLine ? 0 : spaceWidth) > containerWidth - lineOffset() ) {
					this.drawTextLineJustify(ctx, line, offset, this.config.size.textContainerOffset + lineOffset(), containerWidth - lineOffset());

					line = [];
					lineLength = 0;
					firstWordOfLine = true;
					firstLine = false;

					offset += this.config.size.bodyFontSize;
				}

				// add the word to the line
				line.push(word);
				lineLength += wordLength;

				if(!firstWordOfLine) {
					lineLength += spaceWidth;
				}
				firstWordOfLine = false;
			})

			// draw the last line, not justified
			ctx.fillText(line.join(' '), this.config.size.textContainerOffset + lineOffset(), offset);
			offset += this.config.size.bodyFontSize;
		})

		return offset;
	}

	private drawTextLineJustify(ctx: CanvasRenderingContext2D, words: string[], offset: number, horizontalOffset: number, width: number) {
		let lineLength = 0;
		const wordCount = words.length;
		words.forEach((word, index) => {
			lineLength += ctx.measureText(word).width;
		})

		const spaceWidth = ctx.measureText(' ').width;
		const extraWordSpace = width - lineLength;
		const extraSpaceCharacters = Math.floor(extraWordSpace / spaceWidth);
		const extraSpaceCharactersPerWord = Math.floor(extraSpaceCharacters / (wordCount - 1));

		let remainingExtraSpaceCharacters = extraSpaceCharacters - extraSpaceCharactersPerWord * (wordCount - 1);
		let lineText = '';
		words.forEach((word, index) => {
			lineText += word;
			if(index < wordCount - 1) {
				lineText += ' '.repeat(extraSpaceCharactersPerWord);

				if(remainingExtraSpaceCharacters > 0) {
					lineText += ' ';
					remainingExtraSpaceCharacters--;
				}
			}
		})

		ctx.fillText(lineText, horizontalOffset, offset);
	}

	private createPromise() {
		let resolve: any = undefined;
		const promise = new Promise(r => { resolve = r });

		function done() {
			resolve();
		}
	
		function wait() {
			return promise;
		}

		return { done, wait };
	}

	private drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
		ctx.fill();
	}
}

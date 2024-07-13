import { Component, ElementRef } from '@angular/core';
import { PF2Card, CardBodyAbility, CardBodyAbilityHeightened, CardBodyAbilityStaffLevel } from '../../models/pf2.card.model';
import { CardBodyText } from 'src/app/traits/text.trait';
import { CardBodyFluff } from 'src/app/traits/fluff.trait';

@Component({
    template: ''
  })
export class PF2CardRenderer {
	config = {
		size: {
			width: 1748,
			height: 2480,
			
			textMargin: 10,

			titleFontSize: 90,
			titleFontOffset: 70,
			titlePunctureOffset: 50,
			textContainerOffset: 90,
			lineWidth: 5,

			traitAccentWidth: 12,
			traitAccentHeight: 6,
			traitColorWidth: 12,
			traitColorHeight: 6,
			traitFontSize: 70,
			traitRowAmount: 3,

			bodyFontSize: 52,
		},
		colors: {
			red: '#5d0000', // spell
			blue: '#00005d', // item
			green: '#005d00', //

			purple: '#5d005d', // formula
			yellow: '#5d5d00', //
			cyan: '#005d5d', // 
			
			grey: '#5d5d5d', // resource

			accent: '#dac68a', //
		},
	};

    constructor(
        public data: PF2Card,
        public canvas: ElementRef<HTMLCanvasElement>,
    ) {}

	public render() {
		const ctx = this.canvas.nativeElement.getContext('2d');

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
		if(this.data.header.length > 0 || this.data.traits.length > 0) {
			offset = this.renderTraits(ctx, offset);
			offset = this.renderHeader(ctx, offset);
			offset = this.renderLine(ctx, offset);
		}

		// draw content
		offset = this.renderBody(ctx, offset);

		// draw footer
		this.renderFooter(ctx);

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
			ctx.fillStyle = this.config.colors[this.data.color];
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
		ctx.fillText(this.data.name.toUpperCase(), this.config.size.textContainerOffset + (this.data.puctureHole ? this.config.size.titlePunctureOffset : 0), this.config.size.titleFontOffset);

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
		const traitsFontAlign = 'center';
		
		// calculate size of traits based on the amount of traits
		const pageSize = this.config.size.width - this.config.size.textContainerOffset * 2;
		const traitSize = (pageSize - this.config.size.textMargin * (this.config.size.traitRowAmount - 1)) / this.config.size.traitRowAmount;
		const traitTextSize = traitSize - this.config.size.traitAccentWidth * 2 - this.config.size.traitColorWidth * 2;

		// foreach trait
		let traitOffset = this.config.size.textContainerOffset;
		this.data.traits.forEach((trait, index) => {
			// figure out how much space we need for the trait due to the font size
			ctx.font = `${this.config.size.traitFontSize}px ${traitsFont}`;
			const traitTextWidthMesure = ctx.measureText(trait.name.toUpperCase()).width;

			let traitTextWidth = traitTextSize
			while(traitTextWidthMesure > traitTextWidth) {
				traitTextWidth += traitSize + this.config.size.textMargin;
			}

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
			ctx.fillStyle = trait.getColor();
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
				traitOffset + this.config.size.traitAccentWidth + this.config.size.traitColorWidth + traitTextWidth / 2,
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
		const headerFontAction = 'PF2-Action';
		const headerFontColor = '#000';
		const headerFontBaseline = 'top';
		const headerFontAlign = 'left';

		ctx.fillStyle = headerFontColor;
		ctx.textAlign = headerFontAlign;
		ctx.textBaseline = headerFontBaseline;

		this.data.header.forEach((header, index) => {
			if(header.length === 0) return;

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

				if(headerItem.action) {
					// write action
					ctx.font = `${this.config.size.bodyFontSize}px ${headerFontAction}`;
					ctx.fillText(headerItem.action, horizontalOffset, offset);
					horizontalOffset += ctx.measureText(headerItem.action).width + this.config.size.textMargin;
				}

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

	private renderFooter(ctx: CanvasRenderingContext2D) {

		// check if there is a footer
		if(this.data.footer.length === 0) {
			return;
		}

		// calculate total height of footer
		let height: number = 0
		this.data.footer.forEach((footerItem, index) => {
			if (footerItem instanceof CardBodyFluff) {
				height = this.renderBodyFluff(ctx, height, footerItem, false);
			} else if (footerItem instanceof CardBodyText) {
				height = this.renderBodyText(ctx, height, footerItem, false);
			} else if (footerItem instanceof CardBodyAbility) {
				height = this.renderBodyAbility(ctx, height, footerItem, false);
			}
		})

		// Draw Line on top of footer
		this.renderLine(ctx, this.config.size.height - height - this.config.size.titleFontOffset - this.config.size.textMargin);

		// Draw footer
		let offset: number = this.config.size.height - height - this.config.size.titleFontOffset + this.config.size.textMargin;
		this.data.footer.forEach((footerItem, index) => {
			if (footerItem instanceof CardBodyFluff) {
				offset = this.renderBodyFluff(ctx, offset, footerItem);
			} else if (footerItem instanceof CardBodyText) {
				offset = this.renderBodyText(ctx, offset, footerItem);
			} else if (footerItem instanceof CardBodyAbility) {
				offset = this.renderBodyAbility(ctx, offset, footerItem);
			}
		})

		return offset;
	}

	private renderBodyFluff(ctx: CanvasRenderingContext2D, offset: number, bodyItem: CardBodyFluff, draw: boolean = true) {
		const bodyFont = 'GoodPro-Italic';
		const bodyFontColor = '#000';
		const bodyFontBaseline = 'top';
		const bodyFontAlign = 'left';

		ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
		ctx.fillStyle = bodyFontColor;
		ctx.textAlign = bodyFontAlign;
		ctx.textBaseline = bodyFontBaseline;

		bodyItem.text.forEach((text, index) => {
			offset = this.drawText(
				ctx,
				text,
				offset,
				0,
				0,
				draw,
			)

			offset += this.config.size.bodyFontSize;
		})

		return offset;
	}

	private renderBodyText(ctx: CanvasRenderingContext2D, offset: number, bodyItem: CardBodyText, draw: boolean = true) {
		const bodyFont = 'GoodPro';
		const bodyFontColor = '#000';
		const bodyFontBaseline = 'top';
		const bodyFontAlign = 'left';

		ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
		ctx.fillStyle = bodyFontColor;
		ctx.textAlign = bodyFontAlign;
		ctx.textBaseline = bodyFontBaseline;

		bodyItem.text.forEach((text, index) => {
			offset = this.drawText(
				ctx,
				text,
				offset,
				0,
				0,
				draw,
			)

			offset += this.config.size.bodyFontSize;
		})

		return offset;
	}

	private renderBodyAbility(ctx: CanvasRenderingContext2D, offset: number, bodyItem: CardBodyAbility, draw: boolean = true) {
		const bodyFontColor = '#000';
		const bodyFontBaseline = 'top';
		const bodyFontAlign = 'left';

		ctx.fillStyle = bodyFontColor;
		ctx.textAlign = bodyFontAlign;
		ctx.textBaseline = bodyFontBaseline;

		const writingOrder = [
			'activate',
			'trigger',
			'requirement',
			'frequency',
			'effect',

			'crit_success',
			'success',
			'failure',
			'crit_failure',

			'heightened',
			'staff',
		]
		writingOrder.forEach((key) => {
			let value = bodyItem[key as keyof CardBodyAbility];
			if(!value || (Array.isArray(value) && value.length === 0)) { return; }

			if(key === 'heightened' && Array.isArray(value)) {
				value.forEach((heightened) => {
					if(heightened instanceof CardBodyAbilityHeightened) {
						offset = this.renderBodyAbilityLine(ctx, offset, `Heightened (${heightened.name})`, heightened.value, bodyItem, draw);
					}
				})
				return offset + this.config.size.bodyFontSize;
			}

			if(key === 'staff' && Array.isArray(value)) {
				value.forEach((level) => {
					if(level instanceof CardBodyAbilityStaffLevel) {
						const spelltext = level.spells.reduce((text, spell) => {
							if(text.length > 0) {
								text += ', '
							}

							text += `${spell.name}`
							if(spell.notes) {
								text += ` (${spell.notes})`
							}

							return text
						}, '')

						offset = this.renderBodyAbilityLine(ctx, offset, level.name, spelltext, bodyItem, draw);
					}
				})
				return offset + this.config.size.bodyFontSize;
			}
			
			// if the value is an array, render it
			if(Array.isArray(value)) {
				//value = value.join(' ');
				let isFirstLine = true;
				value.forEach((valueItem, index) => {
					if(typeof valueItem === 'string') {
						if(isFirstLine) {
							offset = this.renderBodyAbilityLine(ctx, offset, key, valueItem, bodyItem, draw);
							isFirstLine = false;
						} else {
							offset = this.drawText( ctx, valueItem, offset, 60, 0, draw,
							)
						}

						// if not the last line, add a line break
						if(Array.isArray(value) && index < value.length - 1) {
							offset += this.config.size.bodyFontSize;
						}
					}
				})
			}

			// if the value is a string, render it
			if(typeof value === 'string') {
				offset = this.renderBodyAbilityLine(ctx, offset, key, value, bodyItem, draw);
			}

			return offset + this.config.size.bodyFontSize;
		})

		return offset + this.config.size.bodyFontSize;
	}

	private renderBodyAbilityLine(ctx: CanvasRenderingContext2D, offset: number, key: string, value: string, bodyItem: CardBodyAbility, draw: boolean = true) {
		const bodyFont = 'GoodPro';
		const bodyFontBold = 'GoodPro-Bold';
		const bodyFontAction = 'PF2-Action';
		let textOffset = 0;

		// write exploded key in bold
		const keyTexts = key.split('_');
		keyTexts.forEach((keyText) => {
			const keySingle = `${keyText[0].toUpperCase()}${keyText.slice(1)}`;
			ctx.font = `${this.config.size.bodyFontSize}px ${bodyFontBold}`;
			if(draw) { ctx.fillText(keySingle, this.config.size.textContainerOffset + textOffset, offset); }
			textOffset += ctx.measureText(keySingle).width + ctx.measureText(' ').width;
		})

		// write spacing
		ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
		if(draw) { ctx.fillText("- ", this.config.size.textContainerOffset + textOffset, offset); }
		textOffset += ctx.measureText("- ").width;

		// if action, check if there is an action
		if(key === 'activate' && bodyItem.activateAction) {
			ctx.font = `${this.config.size.bodyFontSize}px ${bodyFontAction}`;
			if(draw) { ctx.fillText(bodyItem.activateAction, this.config.size.textContainerOffset + textOffset, offset); }
			textOffset += ctx.measureText(bodyItem.activateAction).width;

			// write spacing
			ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
			if(draw) { ctx.fillText(" ", this.config.size.textContainerOffset + textOffset, offset); }
			textOffset += ctx.measureText(" ").width;
		}

		ctx.font = `${this.config.size.bodyFontSize}px ${bodyFont}`;
		offset = this.drawText( ctx, value, offset, 60, 60 - textOffset, draw, )

		return offset;
	}

	private drawText(ctx: CanvasRenderingContext2D, text: string, offset: number, horizontalOffset: number, horizontalOffsetFirstLine: number = 0, draw: boolean = true) {
		let currentFont = "normal";
		const bodyFont = 'GoodPro';
		const bodyFontBold = 'GoodPro-Bold';
		const bodyFontAction = 'PF2-Action';

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
					if(draw) { this.drawTextLineJustify(ctx, line, offset, this.config.size.textContainerOffset + lineOffset(), containerWidth - lineOffset()); }

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
			if(draw) { ctx.fillText(line.join(' '), this.config.size.textContainerOffset + lineOffset(), offset); }
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

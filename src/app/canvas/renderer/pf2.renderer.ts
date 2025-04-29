import { Component, ElementRef } from '@angular/core';
import { PF2Card } from '../../models/pf2.card.model';
import { CardConfig } from 'app/models/config.card.model';

@Component({
    template: ''
  })
export class PF2CardRenderer {
	config = new CardConfig(1748, 2480)

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
			if(this.data.traits.length > 0) { offset = this.renderTraits(ctx, offset); }
			if(this.data.header.length > 0) {offset = this.renderHeader(ctx, offset); }
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
			offset = bodyItem.renderItem(ctx, this.config, offset)
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
			height = footerItem.renderItem(ctx, this.config, height, false);
		})

		// Draw Line on top of footer
		this.renderLine(ctx, this.config.size.height - height - this.config.size.titleFontOffset - this.config.size.textMargin);

		// Draw footer
		let offset: number = this.config.size.height - height - this.config.size.titleFontOffset + this.config.size.textMargin;
		this.data.footer.forEach((footerItem, index) => {
			offset = footerItem.renderItem(ctx, this.config, offset);
		})

		return offset;
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

import { FormArray, FormGroup } from "@angular/forms"
import { CardConfig } from "app/models/config.card.model"

export interface TraitInterface { 
    traitForm: FormGroup
    formatForFormSubmit?: () => any
	render?: (ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean) => any
	destroy: () => void
} 

export class TraitBase {
    public traitForm: FormGroup

	protected drawText(ctx: CanvasRenderingContext2D, config: CardConfig, text: string, offset: number, horizontalOffset: number, horizontalOffsetFirstLine: number = 0, draw: boolean = true, isCentered: boolean = false) {
		const containerWidth = (config.size.width - config.size.textContainerOffset * 2);
		if(isCentered) {
			horizontalOffset = containerWidth / 2 + horizontalOffset / 2;
		}

		let paragraphs = text.split(/\r\n|\r|\n/);
		paragraphs.forEach((paragraph, index) => {

			let words = paragraph.split(' ');
			let line: string[] = [];
			let lineLength = 0;
			let firstWordOfLine = true;
			let firstLine = true;

			const lineOffset = ()=> { return horizontalOffset - (firstLine ? horizontalOffsetFirstLine : 0) }
			const spaceWidth = ctx.measureText(' ').width / (isCentered ? 2 : 1)

			words.forEach((word, index) => {
				// if the word is too long to fit on the line, break it
				const wordLength = ctx.measureText(word).width / (isCentered ? 2 : 1)

				if (wordLength + lineLength + (firstWordOfLine ? 0 : spaceWidth) > containerWidth - lineOffset() ) {
					if(draw) { this.drawTextLineJustify(ctx, line, offset, config.size.textContainerOffset + lineOffset(), (containerWidth - lineOffset()) * (isCentered ? 2 : 1)); }

					line = [];
					lineLength = 0;
					firstWordOfLine = true;
					firstLine = false;

					offset += config.size.bodyFontSize;
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
			if(draw) { ctx.fillText(line.join(' '), config.size.textContainerOffset + lineOffset(), offset); }
			offset += config.size.bodyFontSize;
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

	public render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		const bodyFont = 'GoodPro';
		const bodyFontColor = '#000';
		const bodyFontBaseline = 'top';
		const bodyFontAlign = 'left';

		ctx.font = `${config.size.titleFontSize}px ${bodyFont}`;
		ctx.fillStyle = bodyFontColor;
		ctx.textAlign = config.settings.defaultTextAlignment ?? bodyFontAlign;
		ctx.textBaseline = bodyFontBaseline;
	}

	protected renderLine(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, key: string, value: string, draw: boolean = true) {
		const bodyFont = 'GoodPro';
		const bodyFontBold = 'GoodPro-Bold';
		const bodyFontAction = 'PF2-Action';
		let textOffset = 0;

		// write exploded key in bold
		const keyTexts = key.split('_');
		keyTexts.forEach((keyText) => {
			const keySingle = `${keyText[0].toUpperCase()}${keyText.slice(1)}`;
			ctx.font = `${config.size.bodyFontSize}px ${bodyFontBold}`;
			if(draw) { ctx.fillText(keySingle, config.size.textContainerOffset + textOffset, offset); }
			textOffset += ctx.measureText(keySingle).width + ctx.measureText(' ').width;
		})

		// write spacing
		ctx.font = `${config.size.bodyFontSize}px ${bodyFont}`;
		if(draw) { ctx.fillText("- ", config.size.textContainerOffset + textOffset, offset); }
		textOffset += ctx.measureText("- ").width;

		// if action, check if there is an action
		if(key === 'activate' && this.traitForm.get('activateAction')?.value) {
			const activateAction: string = this.traitForm.get('activateAction')?.value ?? '';

			ctx.font = `${config.size.bodyFontSize}px ${bodyFontAction}`;
			if(draw) { ctx.fillText(activateAction, config.size.textContainerOffset + textOffset, offset); }
			textOffset += ctx.measureText(activateAction).width;

			// write spacing
			ctx.font = `${config.size.bodyFontSize}px ${bodyFont}`;
			if(draw) { ctx.fillText(" ", config.size.textContainerOffset + textOffset, offset); }
			textOffset += ctx.measureText(" ").width;
		}

		ctx.font = `${config.size.bodyFontSize}px ${bodyFont}`;
		offset = this.drawText( ctx, config, value, offset, 60, 60 - textOffset, draw, )

		return offset;
	}

	public destroy() {}

	public removeFormArray(position: string, index: number) {
		(<FormArray>this.traitForm.get(position)).removeAt(index)
	}
	public getFormArray(position: string): FormArray {
		return this.traitForm.get(position) as FormArray
	}
	public addFormArray(position: string, type: string) {}
}
export class CardConfig {
	public colors = {
		red: '#5d0000', // spell
		blue: '#00005d', // item
		green: '#005d00', //

		purple: '#5d005d', // formula
		yellow: '#5d5d00', //
		cyan: '#005d5d', // 
		
		grey: '#5d5d5d', // resource

		accent: '#dac68a', //
	}

	public size = {
		width: 0,
		height: 0,
		
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

		checkSize: 120,
		checkMargin: 20,
		checkWidth: 5,
	}

	public settings = {
		defaultTextAlignment: <CanvasTextAlign>'left',
	}

    constructor(
        width: number,
		height: number,
    ) {
		this.size.width = width;
		this.size.height = height;
	}
}
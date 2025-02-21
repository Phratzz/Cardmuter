export class PF2Card {
    constructor(
        public color: ('red' | 'blue' | 'green' | 'yellow' | 'purple' | 'cyan' | 'grey') = 'red',
        public name: string = '',
        public puctureHole: boolean = false,
        public type: string = '',
        public traits: CardTrait[] = [],
        public header: CardHeaderItem[][] = [],
        public body: any[] = [],
        public footer: any[] = [],
    ) {}
}

export class CardTraitGroup {
	constructor(
		public label: string,
		public traits: CardTrait[],
	) {}
}
export class CardTrait {
    constructor(
        public name: string,
        public type: 'common' | 'uncommon' | 'rare' | 'unique' | 'size' | 'alignment' | 'weapon' = 'common'
    ) {}

    public getColor(): string {
        switch (this.type) {
            case 'common':
                return '#58180d';
            case 'uncommon':
                return '#98513d';
            case 'rare':
                return '#002664';
            case 'unique':
                return '#800080';

            case 'size':
                return '#3b7b59';
            case 'alignment':
                return '#576293';
            case 'weapon':
                return '#505050';
        }
    
    }
}

export class CardHeaderItem {
    constructor(
        public name: string,
        public value: string,
        public action: string = '',
    ) {}
}
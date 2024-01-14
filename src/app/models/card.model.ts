export class Card {
    frame: 'item' | 'spell' | 'creature';
    name: string;
    type: string;
    traits: CardTrait[];
    header: CardHeaderItem[][];
    body: (CardBodyFluff | CardBodyText | CardBodyAbility)[];

    constructor(
        frame: 'item' | 'spell' | 'creature',
        name: string,
        type: string,
        traits: CardTrait[],
        header: CardHeaderItem[][],
        body: (CardBodyFluff | CardBodyText | CardBodyAbility)[]
    ) {
        this.frame = frame;
        this.name = name;
        this.type = type;
        this.traits = traits;
        this.header = header;
        this.body = body;
    }
}

export class CardTrait {
    name: string;
    type: 'common' | 'uncommon' | 'rare' | 'unique' | 'size' | 'alignment' | 'weapon';

    constructor(
        name: string,
        type: 'common' | 'uncommon' | 'rare' | 'unique' | 'size' | 'alignment' | 'weapon' = 'common'
    ) {
        this.name = name;
        this.type = type;
    }
}

export class CardHeaderItem {
    name: string;
    value: string;

    constructor(
        name: string,
        value: string
    ) {
        this.name = name;
        this.value = value;
    }
}

export class CardBodyFluff {
    text: string;

    constructor(
        text: string
    ) {
        this.text = text;
    }
}

export class CardBodyText {
    text: string;

    constructor(
        text: string
    ) {
        this.text = text;
    }
}

export class CardBodyAbility {
    activate: string;
    activateAction?: string;
    effect: string;
    frequency?: string;
    requirement?: string;
    trigger?: string;
    traits?: string[];

    constructor({
        activate = '',
        activateAction = '',
        effect = '',
        frequency = '',
        requirement = '',
        trigger = '',
        traits = [],
    }) {
        this.activate = activate;
        this.activateAction = activateAction;
        this.effect = effect;
        this.frequency = frequency;
        this.requirement = requirement;
        this.trigger = trigger;
        this.traits = traits;
    }
}
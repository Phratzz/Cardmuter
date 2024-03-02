export class Card {
    frame: 'item' | 'spell' | 'creature' | 'resource' | 'recipe';
    name: string;
    puctureHole: boolean;
    type: string;
    traits: CardTrait[];
    header: CardHeaderItem[][];
    body: (CardBodyFluff | CardBodyText | CardBodyAbility)[];
    footer: (CardBodyFluff | CardBodyText | CardBodyAbility)[];

    constructor(
        frame: 'item' | 'spell' | 'creature' | 'resource' | 'recipe',
        name: string,
        puctureHole: boolean,
        type: string,
        traits: CardTrait[],
        header: CardHeaderItem[][],
        body: (CardBodyFluff | CardBodyText | CardBodyAbility)[],
        footer: (CardBodyFluff | CardBodyText | CardBodyAbility)[] = [],
    ) {
        this.frame = frame;
        this.name = name;
        this.puctureHole = puctureHole;
        this.type = type;
        this.traits = traits;
        this.header = header;
        this.body = body;
        this.footer = footer;
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
    action: string;

    constructor(
        name: string,
        value: string,
        action: string = '',
    ) {
        this.name = name;
        this.value = value;
        this.action = action;
    }
}

export class CardBodyAbilityHeightened {
    name: string;
    value: string;

    constructor(
        name: string,
        value: string,
    ) {
        this.name = name;
        this.value = value;
    }
}

export class CardBodyFluff {
    text: string[];

    constructor(
        ...text: string[]
    ) {
        this.text = text;
    }
}

export class CardBodyText {
    text: string[];

    constructor(
        ...text: string[]
    ) {
        this.text = text;
    }
}

export class CardBodyAbility {
    activate: string;
    activateAction?: string;
    effect: string | string[];
    frequency?: string;
    requirement?: string;
    trigger?: string;
    traits?: string[];
    success?: string;
    failure?: string;
    crit_success?: string;
    crit_failure?: string;
    heightened?: CardBodyAbilityHeightened[];

    constructor({
        activate = '',
        activateAction = '',
        effect = <string|string[]>'',
        frequency = '',
        requirement = '',
        trigger = '',
        traits = [],
        success = '',
        failure = '',
        crit_success = '',
        crit_failure = '',
        heightened = <CardBodyAbilityHeightened[]>[],
    }) {
        this.activate = activate;
        this.activateAction = activateAction;
        this.effect = effect;
        this.frequency = frequency;
        this.requirement = requirement;
        this.trigger = trigger;
        this.traits = traits;
        this.success = success;
        this.failure = failure;
        this.crit_success = crit_success;
        this.crit_failure = crit_failure;
        this.heightened = heightened;
    }
}
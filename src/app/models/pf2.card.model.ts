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

export class CardBodyText {
    text: string[];

    constructor(
        ...text: string[]
    ) {
        this.text = text;
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

export class CardHeaderItem {
    constructor(
        public name: string,
        public value: string,
        public action: string = '',
    ) {}
}

export class CardBodyAbilityHeightened {
    constructor(
        public name: string,
        public value: string,
    ) {}
}

export class CardBodyAbilityStaffLevel {
    constructor(
        public name: string,
        public spells: CardBodyAbilityStaffSpell[],
    ) {}
}
export class CardBodyAbilityStaffSpell {
    constructor(
        public name: string,
        public notes: string,
    ) {}
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
    staff?: CardBodyAbilityStaffLevel[];

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
        staff = <CardBodyAbilityStaffLevel[]>[],
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
        this.staff = staff;
    }
}
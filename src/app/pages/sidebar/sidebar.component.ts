import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { Card, CardBodyAbility, CardBodyAbilityHeightened, CardBodyFluff, CardBodyText, CardTrait } from 'src/app/models/card.model';
import { RenderService } from 'src/app/services/render.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{

	public cardForm: FormGroup

	constructor(
		private fb: FormBuilder,
		private renderService: RenderService,
	) {
		this.cardForm = this.fb.group({
			base: this.fb.group({
				name: this.fb.control('Needle Darts'),
				type: this.fb.control('cantrip'),
				level: this.fb.control('1'),
				punctureHole: this.fb.control(false),
			}),
			traits: this.fb.control([
				new CardTrait('Attack'),
				new CardTrait('Cantrip'),
				new CardTrait('Concentrate'),
				new CardTrait('Manipulate'),
				new CardTrait('Metal'),
			]),
			header: this.fb.array([
				this.fb.array([
					this.fb.group({
						name: this.fb.control('Traditions'),
						value: this.fb.control('Arcane, Divine, Occult, Primal'),
						action: this.fb.control(''),
					}),
				]),
				this.fb.array([
					this.fb.group({
						name: this.fb.control('Cast'),
						value: this.fb.control(''),
						action: this.fb.control('2'),
					}),
				]),
				this.fb.array([
					this.fb.group({
						name: this.fb.control('Range'),
						value: this.fb.control('60 feet'),
						action: this.fb.control(''),
					}),
					this.fb.group({
						name: this.fb.control('Targets'),
						value: this.fb.control('1 creature'),
						action: this.fb.control(''),
					}),
				]),
				this.fb.array([
					this.fb.group({
						name: this.fb.control('Defense'),
						value: this.fb.control('AC'),
						action: this.fb.control(''),
					}),
				]),
			]),
			body: this.fb.array([
				this.fb.group({
					type: this.fb.control('fluff'),
					text: this.fb.control('You shape three needles out of a piece of metal in your possession and send them flying in a tight group toward one target.'),
				}),
				this.fb.group({
					type: this.fb.control('text'),
					text: this.fb.control('Make a spell attack roll against your target\'s AC. The needles deal 3d4 piercing damage and might cause bleeding. The needles impart any special properties of the metal that forms them; for instance, cold iron needles deal additional damage to creatures with weakness to cold iron. All the needles are made of the same metal, and the metal returns to you after the attack.'),
				}),
				this.fb.group({
					type: this.fb.control('save'),
					crit_success: this.fb.control('The target takes double damage and 1 persistent bleed damage.'),
					success: this.fb.control('The target takes full damage.'),
					failure: this.fb.control(''),
					crit_failure: this.fb.control(''),
				}),
			]),
			footer: this.fb.array([
				this.fb.group({
					type: this.fb.control('heightened'),
					lines: this.fb.array([
						this.fb.group({
							cost: this.fb.control('+1'),
							effect: this.fb.control('You send one additional needle, increasing the regular damage by 1d4 and increasing the persistent bleed damage on a critical hit by 1.'),
						}),
					]),
				}),
			]),
		})

		this.onFormSubmit()
	}

	public traits = [
		{
			label: 'Rarity',
			traits: [
				new CardTrait('Uncommon', 'uncommon'),
				new CardTrait('Rare', 'rare'),
				new CardTrait('Unique', 'unique'),
			]
		},
		{
			label: 'Type',
			traits: [
				new CardTrait('Attack'),
				new CardTrait('Alchemical'),
				new CardTrait('Aura'),
				new CardTrait('Bomb'),
				new CardTrait('Cantrip'),
				new CardTrait('Consumable'),
				new CardTrait('Downtime'),
				new CardTrait('Elixir'),
				new CardTrait('Experiment'),
				new CardTrait('Exploration'),
				new CardTrait('Flourish'),
				new CardTrait('Focus'),
				new CardTrait('Formula'),
				new CardTrait('Incarnate'),
				new CardTrait('Invested'),
				new CardTrait('Magical'),
				new CardTrait('Metamagic'),
				new CardTrait('Talisman'),
				new CardTrait('Trap'),
				new CardTrait('Potion'),
				new CardTrait('Resource'),
				new CardTrait('Spellshape'),

			]
		},
		{
			label: 'Effect',
			traits: [
				new CardTrait('Air'),
				new CardTrait('Earth'),
				new CardTrait('Fire'),
				new CardTrait('Metal'),
				new CardTrait('Water'),
				new CardTrait('Wood'),

				new CardTrait('Acid'),
				new CardTrait('Cold'),
				new CardTrait('Electricity'),
				new CardTrait('Fire'),
				new CardTrait('Force'),
				new CardTrait('Negative'),
				new CardTrait('Poison'),
				new CardTrait('Positive'),
				new CardTrait('Sonic'),
				new CardTrait('Vitality'),
				new CardTrait('Void'),

				new CardTrait('Abjuration'),
				new CardTrait('Conjuration'),
				new CardTrait('Divination'),
				new CardTrait('Enchantment'),
				new CardTrait('Evocation'),
				new CardTrait('Illusion'),
				new CardTrait('Necromancy'),
				new CardTrait('Transmutation'),

				new CardTrait('Charm'),
				new CardTrait('Concentrate'),
				new CardTrait('Consecration'),
				new CardTrait('Contingency'),
				new CardTrait('Curse'),
				new CardTrait('Darkness'),
				new CardTrait('Death'),
				new CardTrait('Dedication'),
				new CardTrait('Detection'),
				new CardTrait('Deviant'),
				new CardTrait('Disease'),
				new CardTrait('Emotion'),
				new CardTrait('Extradimensional'),
				new CardTrait('Fear'),
				new CardTrait('Fortune'),
				new CardTrait('Healing'),
				new CardTrait('Incapacitation'),
				new CardTrait('Light'),
				new CardTrait('Linguistic'),
				new CardTrait('Manipulate'),
				new CardTrait('Mental'),
				new CardTrait('Mindshift'),
				new CardTrait('Misfortune'),
				new CardTrait('Morph'),
				new CardTrait('Move'),
				new CardTrait('Olfactory'),
				new CardTrait('Open'),
				new CardTrait('Polymorph'),
				new CardTrait('Possession'),
				new CardTrait('Prediction'),
				new CardTrait('Press'),
				new CardTrait('Radiation'),
				new CardTrait('Reckless'),
				new CardTrait('Revelation'),
				new CardTrait('Scrying'),
				new CardTrait('Secret'),
				new CardTrait('Sleep'),
				new CardTrait('Splash'),
				new CardTrait('Summoned'),
				new CardTrait('Tech'),
				new CardTrait('Telepathy'),
				new CardTrait('Teleportation'),
				new CardTrait('Virulent'),
				new CardTrait('Vocal'),
			]
		},
		{
			label: 'Armor',
			traits: [
				new CardTrait('Adjusted', 'weapon'),
				new CardTrait('Aquadynamic', 'weapon'),
				new CardTrait('Bulwark', 'weapon'),
				new CardTrait('Comfort', 'weapon'),
				new CardTrait('Flexible', 'weapon'),
				new CardTrait('Hindering', 'weapon'),
				new CardTrait('Inscribed', 'weapon'),
				new CardTrait('Laminar', 'weapon'),
				new CardTrait('Noisy', 'weapon'),
				new CardTrait('Ponderous', 'weapon'),
			]
		},
		{
			label: 'Weapon',
			traits: [
				new CardTrait('Agile', 'weapon'),
				new CardTrait('Alchemical', 'weapon'),
				new CardTrait('Attached', 'weapon'),
				new CardTrait('Backstabber', 'weapon'),
				new CardTrait('Backswing', 'weapon'),
				new CardTrait('Brace', 'weapon'),
				new CardTrait('Brutal', 'weapon'),
				new CardTrait('Capacity', 'weapon'),
				new CardTrait('Climbing', 'weapon'),
				new CardTrait('Cobbled', 'weapon'),
				new CardTrait('Combination', 'weapon'),
				new CardTrait('Concealable', 'weapon'),
				new CardTrait('Concussive', 'weapon'),
				new CardTrait('Critical', 'weapon'),
				new CardTrait('Fusion', 'weapon'),
				new CardTrait('Deadly', 'weapon'),
				new CardTrait('Disarm', 'weapon'),
				new CardTrait('Double Barrel', 'weapon'),
				new CardTrait('Fatal', 'weapon'),
				new CardTrait('Fatal Aim', 'weapon'),
				new CardTrait('Finesse', 'weapon'),
				new CardTrait('Forceful', 'weapon'),
				new CardTrait('Free-Hand', 'weapon'),
				new CardTrait('Grapple', 'weapon'),
				new CardTrait('Hampering', 'weapon'),
				new CardTrait('Injection', 'weapon'),
				new CardTrait('Jousting', 'weapon'),
				new CardTrait('Kickback', 'weapon'),
				new CardTrait('Modular', 'weapon'),
				new CardTrait('Monk', 'weapon'),
				new CardTrait('Mounted', 'weapon'),
				new CardTrait('Nonlethal', 'weapon'),
				new CardTrait('Parry', 'weapon'),
				new CardTrait('Portable', 'weapon'),
				new CardTrait('Propulsive', 'weapon'),
				new CardTrait('Range', 'weapon'),
				new CardTrait('Ranged Trip', 'weapon'),
				new CardTrait('Razing', 'weapon'),
				new CardTrait('Reach', 'weapon'),
				new CardTrait('Recovery', 'weapon'),
				new CardTrait('Reload', 'weapon'),
				new CardTrait('Repeating', 'weapon'),
				new CardTrait('Resonant', 'weapon'),
				new CardTrait('Scatter', 'weapon'),
				new CardTrait('Shove', 'weapon'),
				new CardTrait('Sweep', 'weapon'),
				new CardTrait('Tethered', 'weapon'),
				new CardTrait('Thrown', 'weapon'),
				new CardTrait('Training', 'weapon'),
				new CardTrait('Trip', 'weapon'),
				new CardTrait('Twin', 'weapon'),
				new CardTrait('Two-Hand', 'weapon'),
				new CardTrait('Unarmed', 'weapon'),
				new CardTrait('Vehicular', 'weapon'),
				new CardTrait('Versatile', 'weapon'),
				new CardTrait('Volley', 'weapon'),
			]
		}
	]

	private getFrameFromType(type: string): ('item' | 'spell' | 'creature' | 'resource' | 'recipe') {
		switch (type) {
			case 'cantrip':
			case 'spell':
				return 'spell'

			case 'creature':
				return 'creature'

			case 'item':
				return 'item'

			case 'resource':
				return 'resource'

			case 'recipe':
				return 'recipe'
		}

		return 'item'
	}

	// Traits
	onAddTrait(event: MatSelectChange) {
		const currentTraits = this.cardForm.get('traits')?.value
		const selectedTraits = [...this.cardForm.get('traits')?.value, event.value]
		const sortedTraits = this.traits.map((trait) => trait.traits).flat().filter((trait) => selectedTraits.some((selectedTrait: CardTrait) => selectedTrait.name === trait.name))

		this.cardForm.get('traits')?.setValue(sortedTraits)
		event.source.value = ''
	}
	onRemoveTrait(option: string) {
		this.cardForm.get('traits')?.setValue(this.cardForm.get('traits')?.value.filter((trait: string) => trait !== option))
	}
	// Traits End

	// Form Array
	addFormArray(position: string, type: string) {
		switch (type) {
			case 'headerRow':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.array([
						this.fb.group({
							name: this.fb.control(''),
							value: this.fb.control(''),
							action: this.fb.control(''),
						})
					])
				)
				break
			case 'header':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						name: this.fb.control(''),
						value: this.fb.control(''),
						action: this.fb.control(''),
					}))
				break
			case 'fluff':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						type: this.fb.control('fluff'),
						text: this.fb.control(''),
					}))
				break
			case 'text':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						type: this.fb.control('text'),
						text: this.fb.control(''),
					}))
				break
			case 'ability':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						type: this.fb.control('ability'),
						activate: this.fb.control(''),
						activateAction: this.fb.control(''),
						requirement: this.fb.control(''),
						frequency: this.fb.control(''),
						effect: this.fb.control(''),
					}))
				break;
			case 'save':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						type: this.fb.control('save'),
						crit_success: this.fb.control(''),
						success: this.fb.control(''),
						failure: this.fb.control(''),
						crit_failure: this.fb.control(''),
					}))
				break;
			case 'heightenedRow':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						type: this.fb.control('heightened'),
						lines: this.fb.array([
							this.fb.group({
								cost: this.fb.control(''),
								effect: this.fb.control(''),
							})
						])
					}))
				break;
			case 'heightened':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						cost: this.fb.control(''),
						effect: this.fb.control(''),
					}))
				break;
		}
	}
	removeFormArray(position: string, index: number) {
		(<FormArray>this.cardForm.get(position)).removeAt(index)
	}
	getFormArray(position: string): FormArray {
		return this.cardForm.get(position) as FormArray
	}
	// Form Array End

	onFormSubmit() {
		const newCard = new Card(
			this.getFrameFromType(this.cardForm.get('base')?.get('type')?.value),
			this.cardForm.get('base')?.get('name')?.value,
			this.cardForm.get('base')?.get('punctureHole')?.value,
			this.cardForm.get('base')?.get('type')?.value + ' ' + this.cardForm.get('base')?.get('level')?.value,
			this.cardForm.get('traits')?.value,
			this.cardForm.get('header')?.value.map((header: any) => header.map((item: any) => item)),
			this.cardForm.get('body')?.value.map((item: any) => {
				switch (item.type) {
					case 'fluff':
						return new CardBodyFluff(item.text)
					case 'text':
						return new CardBodyText(item.text)
					case 'ability':
					case 'save':
						return new CardBodyAbility(item)
					case 'heightened':
						return new CardBodyAbilityHeightened(item.cost, item.effect)
					default:
						return null
				}
			}),
			this.cardForm.get('footer')?.value.map((item: any) => {
				switch (item.type) {
					case 'fluff':
						return new CardBodyFluff(item.text)
					case 'text':
						return new CardBodyText(item.text)
					case 'ability':
					case 'save':
						return new CardBodyAbility(item)
					case 'heightened':
						return new CardBodyAbility({
							heightened: item.lines.map((line: any) => new CardBodyAbilityHeightened(line.cost, line.effect))
						})
					default:
						return null
				}
			}),
		);

		this.renderService.newCard(newCard);
	}
}

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { PF2AltCard, CardBodyAbility, CardBodyAbilityHeightened, CardBodyAbilityStaffLevel, CardBodyAbilityStaffSpell, CardTrait, CardBodyTitle } from 'src/app/models/pf2-alt.card.model';
import { RenderService } from 'src/app/services/render.service';
import { SidebarBase } from './base';
import { CardBodyFluff, CardBodyText } from 'src/app/models/pf2.card.model';

@Component({
	selector: 'app-sidebar-pf2-alt',
	templateUrl: './pf2-alt.component.html',
	styleUrls: ['./base.scss']
})
export class PF2AltSidebarComponent extends SidebarBase{
	currentSampleControl = new FormControl('item')

	constructor(
		private fb: FormBuilder,
		private renderService: RenderService,
	) {
		super()
		this.loadSampleData()
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
				new CardTrait('Adjustment'),
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
				new CardTrait('Tattoo'),
				new CardTrait('Trap'),
				new CardTrait('Potion'),
				new CardTrait('Resource'),
				new CardTrait('Spellshape'),
				new CardTrait('Spellheart'),
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
				new CardTrait('Attached', 'weapon'),
				new CardTrait('Backstabber', 'weapon'),
				new CardTrait('Backswing', 'weapon'),
				new CardTrait('Brace', 'weapon'),
				new CardTrait('Brutal', 'weapon'),
				new CardTrait('Capacity 3', 'weapon'),
				new CardTrait('Capacity 4 ', 'weapon'),
				new CardTrait('Capacity 5', 'weapon'),
				new CardTrait('Capacity 6', 'weapon'),
				new CardTrait('Climbing', 'weapon'),
				new CardTrait('Cobbled', 'weapon'),
				new CardTrait('Combination', 'weapon'),
				new CardTrait('Concealable', 'weapon'),
				new CardTrait('Concussive', 'weapon'),
				new CardTrait('Critical', 'weapon'),
				new CardTrait('Fusion', 'weapon'),
				new CardTrait('Deadly d6', 'weapon'),
				new CardTrait('Deadly d8', 'weapon'),
				new CardTrait('Deadly d10', 'weapon'),
				new CardTrait('Deadly d12', 'weapon'),
				new CardTrait('Disarm', 'weapon'),
				new CardTrait('Double Barrel', 'weapon'),
				new CardTrait('Fatal d6', 'weapon'),
				new CardTrait('Fatal d8', 'weapon'),
				new CardTrait('Fatal d10', 'weapon'),
				new CardTrait('Fatal d12', 'weapon'),
				new CardTrait('Fatal Aim', 'weapon'),
				new CardTrait('Finesse', 'weapon'),
				new CardTrait('Forceful', 'weapon'),
				new CardTrait('Free-Hand', 'weapon'),
				new CardTrait('Grapple', 'weapon'),
				new CardTrait('Hampering', 'weapon'),
				new CardTrait('Injection', 'weapon'),
				new CardTrait('Jousting d6', 'weapon'),
				new CardTrait('Jousting d8', 'weapon'),
				new CardTrait('Jousting d10', 'weapon'),
				new CardTrait('Jousting d12', 'weapon'),
				new CardTrait('Kickback', 'weapon'),
				new CardTrait('Modular', 'weapon'),
				new CardTrait('Monk', 'weapon'),
				new CardTrait('Mounted', 'weapon'),
				new CardTrait('Nonlethal', 'weapon'),
				new CardTrait('Parry', 'weapon'),
				new CardTrait('Portable', 'weapon'),
				new CardTrait('Propulsive', 'weapon'),
				new CardTrait('Ranged Trip', 'weapon'),
				new CardTrait('Razing', 'weapon'),
				new CardTrait('Reach', 'weapon'),
				new CardTrait('Recovery', 'weapon'),
				new CardTrait('Reload', 'weapon'),
				new CardTrait('Repeating', 'weapon'),
				new CardTrait('Resonant', 'weapon'),
				new CardTrait('Scatter 5ft', 'weapon'),
				new CardTrait('Scatter 10fr', 'weapon'),
				new CardTrait('Shove', 'weapon'),
				new CardTrait('Sweep', 'weapon'),
				new CardTrait('Tethered', 'weapon'),
				new CardTrait('Thrown 10ft', 'weapon'),
				new CardTrait('Thrown 20ft', 'weapon'),
				new CardTrait('Thrown 40ft', 'weapon'),
				new CardTrait('Training', 'weapon'),
				new CardTrait('Trip', 'weapon'),
				new CardTrait('Twin', 'weapon'),
				new CardTrait('Two-Hand d6', 'weapon'),
				new CardTrait('Two-Hand d8', 'weapon'),
				new CardTrait('Two-Hand d10', 'weapon'),
				new CardTrait('Two-Hand d12', 'weapon'),
				new CardTrait('Unarmed', 'weapon'),
				new CardTrait('Vehicular', 'weapon'),
				new CardTrait('Versatile P', 'weapon'),
				new CardTrait('Versatile B', 'weapon'),
				new CardTrait('Versatile S', 'weapon'),
				new CardTrait('Volley 10ft', 'weapon'),
				new CardTrait('Volley 20ft', 'weapon'),
				new CardTrait('Volley 30ft', 'weapon'),
				new CardTrait('Volley 40ft', 'weapon'),
				new CardTrait('Volley 50ft', 'weapon'),
			]
		}
	]

	// Traits
	onAddTrait(event: any) {
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
			case 'header':
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
			case 'headerRow':
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
			case 'title':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						type: this.fb.control('title'),
						text: this.fb.control(''),
					}))
				break
			case 'ability':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						type: this.fb.control('ability'),
						activate: this.fb.control(''),
						activateAction: this.fb.control(''),
						trigger: this.fb.control(''),
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

			case 'heightened':
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
			case 'heightenedLine':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						cost: this.fb.control(''),
						effect: this.fb.control(''),
					}))
				break;

			case 'staff':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						type: this.fb.control('staff'),
						levels: this.fb.array([
							this.fb.group({
								name: this.fb.control(''),
								spells: this.fb.array([
									this.fb.group({
										name: this.fb.control(''),
										notes: this.fb.control(''),
									})
								])
							})
						])
					}))
				break;
			case 'staffLevel':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						name: this.fb.control(''),
						spells: this.fb.array([
							this.fb.group({
								name: this.fb.control(''),
								notes: this.fb.control(''),
							})
						])
					}))
				break;
			case 'staffSpell':
				(<FormArray>this.cardForm.get(position)).push(
					this.fb.group({
						name: this.fb.control(''),
						notes: this.fb.control(''),
					}))
				break;
		}
	}
	// Form Array End

	onFormSubmit() {
		const newCard = new PF2AltCard(
			this.cardForm.get('base')?.get('color')?.value,
			this.cardForm.get('base')?.get('size')?.value,
			this.cardForm.get('base')?.get('name')?.value,
			this.cardForm.get('traits')?.value,
			this.cardForm.get('header')?.value.map((header: any) => header.map((item: any) => item)),
			this.cardForm.get('body')?.value.map((item: any) => {
				switch (item.type) {
					case 'fluff':
						return new CardBodyFluff(item.text)
					case 'text':
						return new CardBodyText(item.text)
					case 'title':
						return new CardBodyTitle(item.text)
					case 'ability':
					case 'save':
						return new CardBodyAbility(item)
					case 'heightened':
						return new CardBodyAbility({
							heightened: item.lines.map((line: any) => new CardBodyAbilityHeightened(line.cost, line.effect))
						})
					case 'staff':
						return new CardBodyAbility({
							staff: item.levels.map((level: any) =>new CardBodyAbilityStaffLevel(level.name, level.spells.map((spell: any) => new CardBodyAbilityStaffSpell(spell.name, spell.notes))))
						})
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
					case 'title':
						return new CardBodyTitle(item.text)
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
	override importLoad(data: any) {
		// convert data.traits to CardTrait[]
		data.traits = data.traits.map((trait: any) => new CardTrait(trait.name, trait.type))

		// reset and remove form controls
		this.cardForm.reset()
		this.getFormArray('header').clear()
		this.getFormArray('body').clear()
		this.getFormArray('footer').clear()

		// add form controls
		data.header.forEach(() => this.addFormArray('header', 'header'))
		data.body.forEach((line: any) => {
			if (line.type === 'fluff') {
				this.addFormArray('body', 'fluff')
			} else if (line.type === 'text') {
				this.addFormArray('body', 'text')
			} else if (line.type === 'ability' || line.type === 'save') {
				this.addFormArray('body', 'ability')
			}
		})
		data.footer.forEach((line: any) => {
			if (line.type === 'fluff') {
				this.addFormArray('footer', 'fluff')
			} else if (line.type === 'text') {
				this.addFormArray('footer', 'text')
			} else if (line.type === 'ability' || line.type === 'save') {
				this.addFormArray('footer', 'ability')
			}
		})

		this.cardForm.patchValue(data)
		this.onFormSubmit()
	}

	loadSampleData() {
		const sampleType = this.currentSampleControl.value
		this.currentSampleControl.setValue('')

		switch (sampleType) {
			case 'project':
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control('Alchemist\'s Fire (Lesser)'),
						size: this.fb.control('normal'),
						color: this.fb.control('yellow'),
					}),
					traitInput: this.fb.control(''),
					traits: this.fb.control([
						new CardTrait('Alchemical'),
						new CardTrait('Bomb'),
						new CardTrait('Consumable'),
						new CardTrait('Formula'),
						new CardTrait('Fire'),
						new CardTrait('Splash'),
					]),
					header: this.fb.array([
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Usage'),
								value: this.fb.control('held in 1 hand'),
								action: this.fb.control(''),
							}),
						]),
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Crafting Cost'),
								value: this.fb.control('15sp'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Bulk'),
								value: this.fb.control('L'),
								action: this.fb.control(''),
							}),
						]),
					]),
					body: this.fb.array([
						this.fb.group({
							type: this.fb.control('fluff'),
							text: this.fb.control('Alchemist\'s fire is a combination of several volatile liquids that ignite when exposed to air.'),
						}),
						this.fb.group({
							type: this.fb.control('ability'),
							activate: this.fb.control('Strike'),
							activateAction: this.fb.control('1'),
							trigger: this.fb.control(''),
							requirement: this.fb.control(''),
							frequency: this.fb.control(''),
							effect: this.fb.control('You throw the bomb, dealing 1d8 fire damage, 1 persistant fire damage and 1 splash fire damage'),
						}),
					]),
					footer: this.fb.array([
					]),
				})
				break
			case 'item':
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control('Erinys hair'),
						size: this.fb.control('small'),
						color: this.fb.control('grey'),
					}),
					traitInput: this.fb.control(''),
					traits: this.fb.control([
						new CardTrait('Fire'),
						new CardTrait('Devil'),
					]),
					header: this.fb.array([
					]),
					body: this.fb.array([
						this.fb.group({
							type: this.fb.control('fluff'),
							text: this.fb.control('Erinys are devil of vengance and bloddy justice, while an erinys appears as a fallen angel, only the first erinyes share that origin and now originate in a myriad of ways.'),
						}),
						this.fb.group({
							type: this.fb.control('text'),
							text: this.fb.control('The hair of an erinys are as flexible as normal rope, but as strong as steel wire and immune to fire, it has a Hardness of 5 and 20 Hitpoits.'),
						}),
					]),
					footer: this.fb.array([
						this.fb.group({
							type: this.fb.control('title'),
							text: this.fb.control('10 GP'),
						}),
					]),
				})
				break
			default:
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control(''),
						type: this.fb.control(''),
						color: this.fb.control(''),
						level: this.fb.control(''),
						punctureHole: this.fb.control(false),
					}),
					traitInput: this.fb.control(''),
					traits: this.fb.control([
					]),
					header: this.fb.array([
					]),
					body: this.fb.array([
					]),
					footer: this.fb.array([
					]),
				})
				break
		}
		this.onFormSubmit()
	}
}

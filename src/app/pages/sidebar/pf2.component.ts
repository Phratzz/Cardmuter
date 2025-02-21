import { AfterViewInit, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { PF2Card, CardTrait, CardTraitGroup } from '../../models/pf2.card.model';
import { RenderService } from '../../services/render.service';
import { SidebarBase } from './base.component';
import { TextTrait } from '../../traits/text.trait.component';
import { FluffTrait } from '../../traits/fluff.trait.component';
import { ComponentLoaderService } from '../../services/componentLoader.service';
import { ReplaySubject } from 'rxjs';
import { TraitInterface } from 'app/interfaces/trait.interface';
import { AbilityTrait } from 'app/traits/ability.trait.component';
import { SaveTrait } from 'app/traits/save.trait.component';
import { AdvancedTrait } from 'app/traits/advanced.trait.component';
import { HeightenTrait } from 'app/traits/heighten.trait.component';
import { StaffTrait } from 'app/traits/staff.trait.component';

@Component({
	selector: 'app-sidebar-pf2',
	templateUrl: './pf2.component.html',
	styleUrls: ['./base.component.scss']
})
export class PF2SidebarComponent extends SidebarBase implements AfterViewInit {
	public currentSampleControl = new FormControl('weapon')
	public formLayout: PF2Card = new PF2Card()
	public traitSearch = new FormControl<string>('');
	public traitSearchField = new FormControl<string>('');

	@ViewChild('bodyContentContainer', { read: ViewContainerRef }) bodyContentContainer: ViewContainerRef
	@ViewChild('footerContentContainer', { read: ViewContainerRef }) footerContentContainer: ViewContainerRef

	constructor(
		private fb: FormBuilder,
		private renderService: RenderService,
		private componentLoaderService: ComponentLoaderService,
	) {
		super()

		this.formLayout.body = [
			TextTrait,
			FluffTrait,
			AbilityTrait,
			SaveTrait,
			AdvancedTrait,
			//HeightenTrait,
			StaffTrait,
		]
		this.formLayout.footer = [
			TextTrait,
			FluffTrait,
			//AbilityTrait,
			//SaveTrait,
			//AdvancedTrait,
			HeightenTrait,
			//StaffTrait,
		]

		this.loadSampleData(true)
	}

	ngAfterViewInit() {
		this.traitSearchField.valueChanges
			.subscribe(() => {
				this.filterTraits();
			});

		this.loadSampleData()
	}

	private traits = [
		new CardTraitGroup(
			'Rarity',
			[
				new CardTrait('Uncommon', 'uncommon'),
				new CardTrait('Rare', 'rare'),
				new CardTrait('Unique', 'unique'),
			]
		),
		new CardTraitGroup(
			'Type',
			[
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
		),
		new CardTraitGroup(
			'Effect',
			[
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
		),
		new CardTraitGroup(
			'Armor',
			[
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
		),
		new CardTraitGroup(
			'Weapon',
			[
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
		)
	]
	public filteredTraits: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

	filterTraits() {
		if (!this.traits) {
		  return;
		}
		
		// get the search keyword
		let search = this.traitSearchField.value ?? '';
		const traitCopy = this.instanceTraits();
		if (!search) {
		  this.filteredTraits.next(traitCopy);
		  return;
		} else {
		  search = search.toLowerCase();
		}

		// filter the banks
		this.filteredTraits.next(
			traitCopy.filter((group: CardTraitGroup) => {
			const showTrait = group.label.toLowerCase().indexOf(search) > -1;
			if (!showTrait) {
				group.traits = group.traits.filter((trait) => trait.name.toLowerCase().indexOf(search) > -1);
			}
			return group.traits.length > 0;
		  })
		);
	}

	protected instanceTraits() {
	  const localInstance: CardTraitGroup[] = [];
	  this.traits.forEach(trait => {
		localInstance.push({
		  label: trait.label,
		  traits: trait.traits.slice()
		});
	  });
	  return localInstance;
	}

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

	addComponent(type: string, component: any, data?: any) {
		let container: ViewContainerRef
		switch (type) {
			case 'body': container = this.bodyContentContainer; break;
			case 'footer': container = this.footerContentContainer; break;
			default: return
		}

		const addedComponent: ComponentRef<TraitInterface> = this.componentLoaderService.loadDynamicComponent(container, component)
		addedComponent.instance.traitForm.patchValue(data);

		(<FormArray>this.cardForm.get(type)).push(this.fb.control(addedComponent))

		addedComponent.instance.destroy = () => {
			const formArray = (<FormArray>this.cardForm.get(type))
			const index = formArray.controls.findIndex((control) => control.value === addedComponent )

			if(index >= 0) {
				formArray.removeAt(index)
			}

			addedComponent.destroy()
		}
	}

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
		}
	}
	// Form Array End

	onFormSubmit() {
		const newCard = new PF2Card(
			this.cardForm.get('base')?.get('color')?.value,
			this.cardForm.get('base')?.get('name')?.value,
			this.cardForm.get('base')?.get('punctureHole')?.value,
			this.cardForm.get('base')?.get('type')?.value + ' ' + this.cardForm.get('base')?.get('level')?.value,
			this.cardForm.get('traits')?.value,
			this.cardForm.get('header')?.value.map((header: any) => header.map((item: any) => item)),
			this.cardForm.get('body')?.value.map((item: any) => item.instance),
			this.cardForm.get('footer')?.value.map((item: any) => item.instance),
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

	loadSampleData(initalLoad: boolean = false) {
		let sampleType = this.currentSampleControl.value

		if(initalLoad) {
			sampleType = "empty"
		} else {
			this.currentSampleControl.setValue('')
		}

		// remove dynamic components
		this.bodyContentContainer?.clear()
		this.footerContentContainer?.clear()

		switch (sampleType) {
			case 'spell':
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control('Needle Darts'),
						type: this.fb.control('cantrip'),
						color: this.fb.control('red'),
						level: this.fb.control('1'),
						punctureHole: this.fb.control(false),
					}),
					traitInput: this.fb.control(''),
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
					body: this.fb.array([]),
					footer: this.fb.array([]),
				})

				// Body
				this.addComponent('body', FluffTrait, {
					text: 'You shape three needles out of a piece of metal in your possession and send them flying in a tight group toward one target.'
				})
				this.addComponent('body', TextTrait, {
					text: 'Make a spell attack roll against your target\'s AC. The needles deal 3d4 piercing damage and might cause bleeding. The needles impart any special properties of the metal that forms them; for instance, cold iron needles deal additional damage to creatures with weakness to cold iron. All the needles are made of the same metal, and the metal returns to you after the attack.'
				})
				this.addComponent('body', SaveTrait, {
					crit_success: 'The target takes double damage and 1 persistent bleed damage.',
					success: 'The target takes full damage.',
					failure: '',
					crit_failure: '',
				})
				// End Body

				// Footer
				this.addComponent('footer', HeightenTrait, {
					lines: [
						{
							cost: '+1',
							effect: 'You send one additional needle, increasing the regular damage by 1d4 and increasing the persistent bleed damage on a critical hit by 1.'
						}
					]
				})
				// End Footer
				break
			case 'wonderous':
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control('Handwraps of Fury'),
						type: this.fb.control('Item'),
						color: this.fb.control('blue'),
						level: this.fb.control('2'),
						punctureHole: this.fb.control(false),
					}),
					traitInput: this.fb.control(''),
					traits: this.fb.control([
						new CardTrait('Invested'),
						new CardTrait('Magical'),
						new CardTrait('Emotion'),
						new CardTrait('Transmutation'),
					]),
					header: this.fb.array([
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Usage'),
								value: this.fb.control('worn gloves'),
								action: this.fb.control(''),
							}),
						]),
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Price'),
								value: this.fb.control('1gp'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Bulk'),
								value: this.fb.control('—'),
								action: this.fb.control(''),
							}),
						]),
					]),
					body: this.fb.array([]),
					footer: this.fb.array([]),
				})

				// Body
				this.addComponent('body', FluffTrait, {
					text: 'As you invest these embroidered strips of cloth, you feel a wave of anger and frustraion rise up within you.'
				})
				this.addComponent('body', TextTrait, {
					text: 'These handwraps have weapon runes etched into them to give your unarmed attacks the benefits of those runes, making your unarmed attacks work like magic weapons, treat them as melee weapons of the brawling group with a light bulk for these purposes.'
				})
				this.addComponent('body', AbilityTrait, {
					activate: 'Envision',
					activateAction: 'r',
					trigger: '',
					requirement: 'You were damaged by an oppoenent',
					frequency: '',
					effect: 'You deal 2 additional damage with melee Strikes against the triggering opponent until the end of your next turn.'
				})
				// End Body
				break
			case 'weapon':
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control('Draconic Defender'),
						type: this.fb.control('Item'),
						color: this.fb.control('blue'),
						level: this.fb.control('2'),
						punctureHole: this.fb.control(false),
					}),
					traitInput: this.fb.control(''),
					traits: this.fb.control([
						new CardTrait('Invested'),
						new CardTrait('Magical'),
						new CardTrait('Transmutation'),

						new CardTrait('Agile', 'weapon'),
						new CardTrait('Disarm', 'weapon'),
						new CardTrait('Finesse', 'weapon'),
						new CardTrait('Parry', 'weapon'),
						new CardTrait('Versatile S', 'weapon'),
					]),
					header: this.fb.array([
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Damage'),
								value: this.fb.control('1d4 P'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Hands'),
								value: this.fb.control('1'),
								action: this.fb.control(''),
							}),
						]),
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Type'),
								value: this.fb.control('melee'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Category'),
								value: this.fb.control('martial'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Group'),
								value: this.fb.control('knife'),
								action: this.fb.control(''),
							}),
						]),
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Price'),
								value: this.fb.control('12gp'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Bulk'),
								value: this.fb.control('L'),
								action: this.fb.control(''),
							}),
						]),
					]),
					body: this.fb.array([]),
					footer: this.fb.array([]),
				})

				// Body
				this.addComponent('body', FluffTrait, {
					text: 'This parrying dagger for features a robust guard in the form of a dragons head, upon closer inspection the head shares features with that of o bronze dragon.'
				})
				this.addComponent('body', AbilityTrait, {
					activate: 'Strike',
					activateAction: 'r',
					trigger: 'A creature with the Dragon trait critically fails a strike against you',
					requirement: '',
					frequency: '',
					effect: 'You take advantage of an opening from your enemy\'s fumbled attack. You can make a melee Strike against the triggering foe.'
				})
				this.addComponent('body', AbilityTrait, {
					activate: 'Strike',
					activateAction: 'r',
					trigger: 'A creature with the Dragon trait fails a strike against you',
					requirement: 'You have the Opportune Riposte feat',
					frequency: '',
					effect: 'You take advantage of an opening from your enemy\'s fumbled attack. You can make a melee Strike against the triggering foe.'
				})
				// End Body
				break
			case 'armor':
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control('Oaken Weave'),
						type: this.fb.control('Item'),
						color: this.fb.control('blue'),
						level: this.fb.control('2'),
						punctureHole: this.fb.control(false),
					}),
					traitInput: this.fb.control(''),
					traits: this.fb.control([
						new CardTrait('Abjuration'),
						new CardTrait('Magical'),
						new CardTrait('Plant'),

						new CardTrait('Laminar', 'weapon'),
					]),
					header: this.fb.array([
						this.fb.array([
							this.fb.group({
								name: this.fb.control('AC Bonus'),
								value: this.fb.control('+1'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Dex Cap'),
								value: this.fb.control('+4'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Check Penalty'),
								value: this.fb.control('-1'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Speed Penalty'),
								value: this.fb.control('—'),
								action: this.fb.control(''),
							}),
						]),
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Strength'),
								value: this.fb.control('10'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Category'),
								value: this.fb.control('Light'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Group'),
								value: this.fb.control('wood'),
								action: this.fb.control(''),
							}),
						]),
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Price'),
								value: this.fb.control('10gp'),
								action: this.fb.control(''),
							}),
							this.fb.group({
								name: this.fb.control('Bulk'),
								value: this.fb.control('1'),
								action: this.fb.control(''),
							}),
						]),
					]),
					body: this.fb.array([]),
					footer: this.fb.array([]),
				})

				// Body
				this.addComponent('body', FluffTrait, {
					text: 'This parrying dagger for features a robust guard in the form of a dragons head, upon closer inspection the head shares features with that of o bronze dragon.'
				})
				this.addComponent('body', AbilityTrait, {
					activate: 'Strike',
					activateAction: 'r',
					trigger: 'A creature with the Dragon trait critically fails a strike against you',
					requirement: '',
					frequency: '',
					effect: 'You take advantage of an opening from your enemy\'s fumbled attack. You can make a melee Strike against the triggering foe.'
				})
				this.addComponent('body', AbilityTrait, {
					activate: 'Strike',
					activateAction: 'r',
					trigger: 'A creature with the Dragon trait fails a strike against you',
					requirement: 'You have the Opportune Riposte feat',
					frequency: '',
					effect: 'You take advantage of an opening from your enemy\'s fumbled attack. You can make a melee Strike against the triggering foe.'
				})
				// End Body
				break
			case 'formula':
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control('Alchemist\'s Fire (Lesser)'),
						type: this.fb.control('Formula'),
						color: this.fb.control('purple'),
						level: this.fb.control('1'),
						punctureHole: this.fb.control(false),
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
					body: this.fb.array([]),
					footer: this.fb.array([]),
				})

				// Body
				this.addComponent('body', FluffTrait, {
					text: 'Alchemist\'s fire is a combination of several volatile liquids that ignite when exposed to air.'
				})
				this.addComponent('body', AbilityTrait, {
					activate: 'Strike',
					activateAction: '1',
					trigger: '',
					requirement: '',
					frequency: '',
					effect: 'You throw the bomb, dealing 1d8 fire damage, 1 persistant fire damage and 1 splash fire damage'
				})
				// End Body
				break
			case 'test':
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control('Test Item'),
						type: this.fb.control('Formula'),
						color: this.fb.control('purple'),
						level: this.fb.control('1'),
						punctureHole: this.fb.control(false),
					}),
					traitInput: this.fb.control(''),
					traits: this.fb.control([
						new CardTrait('Alchemical'),
						new CardTrait('Bomb'),
						new CardTrait('Consumable'),
					]),
					header: this.fb.array([
						this.fb.array([
							this.fb.group({
								name: this.fb.control('Usage'),
								value: this.fb.control('held in 1 hand'),
								action: this.fb.control(''),
							}),
						]),
					]),
					body: this.fb.array([]),
					footer: this.fb.array([]),
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
					body: this.fb.array([]),
					footer: this.fb.array([]),
				})
				break
		}
		this.onFormSubmit()
	}
}

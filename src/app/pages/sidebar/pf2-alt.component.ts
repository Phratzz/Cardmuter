import { AfterViewInit, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { PF2AltCard, CardTrait, CardTraitGroup } from '../../models/pf2-alt.card.model';
import { RenderService } from '../../services/render.service';
import { SidebarBase } from './base.component';
import { TextTrait } from '../../traits/text.trait.component';
import { FluffTrait } from '../../traits/fluff.trait.component';
import { AbilityTrait } from 'app/traits/ability.trait.component';
import { SaveTrait } from 'app/traits/save.trait.component';
import { AdvancedTrait } from 'app/traits/advanced.trait.component';
import { StaffTrait } from 'app/traits/staff.trait.component';
import { HeightenTrait } from 'app/traits/heighten.trait.component';
import { ComponentLoaderService } from 'app/services/componentLoader.service';
import { ReplaySubject } from 'rxjs';
import { TraitInterface } from 'app/interfaces/trait.interface';
import { TitleTrait } from 'app/traits/title.trait.component';

@Component({
	selector: 'app-sidebar-pf2-alt',
	templateUrl: './pf2-alt.component.html',
	styleUrls: ['./base.component.scss']
})
export class PF2AltSidebarComponent extends SidebarBase implements AfterViewInit {
	public currentSampleControl = new FormControl('test')
	public formLayout: PF2AltCard = new PF2AltCard()
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
			TitleTrait,
		]
		this.formLayout.footer = [
			TextTrait,
			FluffTrait,
			//AbilityTrait,
			//SaveTrait,
			//AdvancedTrait,
			HeightenTrait,
			//StaffTrait,
			TitleTrait,
		]
		
		this.loadSampleData()
		this.onFormSubmit()
	}

	ngAfterViewInit() {
		this.traitSearchField.valueChanges
		  .subscribe(() => {
			this.filterTraits();
		  });
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
		const newCard = new PF2AltCard(
			this.cardForm.get('base')?.get('color')?.value,
			this.cardForm.get('base')?.get('size')?.value,
			this.cardForm.get('base')?.get('name')?.value,
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

	loadSampleData() {
		const sampleType = this.currentSampleControl.value
		this.currentSampleControl.setValue('')

		switch (sampleType) {
			case 'project':
				this.cardForm = this.fb.group({
					base: this.fb.group({
						name: this.fb.control('On the subject of Oozes'),
						size: this.fb.control('normal'),
						color: this.fb.control('yellow'),
					}),
					traitInput: this.fb.control(''),
					traits: this.fb.control([
					]),
					header: this.fb.array([
					]),
					body: this.fb.array([]),
					footer: this.fb.array([]),
				})

				// Body
				this.addComponent('body', FluffTrait, {
					text: 'While delving into a tower found in a small forest clearing, several old tomes were found'
				})
				this.addComponent('body', FluffTrait, {
					text: 'Among them, a collection of notes and sketches about oozes and their properties'
				})
				// End Body

				// Footer
				this.addComponent('footer', TitleTrait, {
					text: 'Occultism — DC 16'
				})
				// End Footer
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
					body: this.fb.array([]),
					footer: this.fb.array([]),
				})

				// Body
				this.addComponent('body', FluffTrait, {
					text: 'Erinys are devil of vengance and bloddy justice, while an erinys appears as a fallen angel, only the first erinyes share that origin and now originate in a myriad of ways.'
				})
				this.addComponent('body', TextTrait, {
					text: 'The hair of an erinys are as flexible as normal rope, but as strong as steel wire and immune to fire, it has a Hardness of 5 and 20 Hitpoits.'
				})
				// End Body

				// Footer
				this.addComponent('footer', TitleTrait, {
					text: '10 GP'
				})
				// End Footer

				break
			case 'test':
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

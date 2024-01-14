import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

	public cardForm: FormGroup

	constructor(
		private fb: FormBuilder
	) {
		this.cardForm = this.fb.group({
			meta: this.fb.group({
				type: this.fb.control('spell'),
			}),
			base: this.fb.group({
				name: this.fb.control(''),
				type: this.fb.control(''),
				level: this.fb.control(''),
			}),
			traits: this.fb.array([]),
			header: this.fb.array([]),
			body: this.fb.array([]),
		})
	}

	onFormSubmit(e: any) {
		console.log(this.cardForm.value)
	}

}

import { FormArray, FormGroup } from "@angular/forms"

export class SidebarBase {
	public cardForm: FormGroup

    constructor() {
    }

	removeFormArray(position: string, index: number) {
		(<FormArray>this.cardForm.get(position)).removeAt(index)
	}
	getFormArray(position: string): FormArray {
		return this.cardForm.get(position) as FormArray
	}

	onExport() {
		// save to file
		const data = JSON.stringify(this.cardForm.value, null, 4)
		const blob = new Blob([data], { type: 'text/plain' })
		const url = window.URL.createObjectURL(blob)
		let fileName = this.cardForm.get('base')?.get('name')?.value.replace(/\s/g, '-') + '.json'

		const a = document.createElement('a')
		a.href = url
		a.download = fileName
		a.click()

		console.info('Exported:', fileName, this.cardForm.value)
		window.URL.revokeObjectURL(url)
	}
	onImport() {
		// load from file
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = '.json'
		input.onchange = (e) => {
			const file:any = (<HTMLInputElement>e.target).files?.[0]
			const reader = new FileReader()

			reader.onload = (e) => {
				const data = JSON.parse(<string>reader.result)
				console.info('Imported:', file.name, data)

                // if funnction importLoad is defined, call it
                this.importLoad(data)
			}

			reader.readAsText(file)
		}

		input.click()
	}
    importLoad(data: any) {
        // override this function
    }
}
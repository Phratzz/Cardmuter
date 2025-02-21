// shared service to handle rendering and data for canvas field

import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { TraitInterface } from 'app/interfaces/trait.interface';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    loadDynamicComponent(viewContainerRef: ViewContainerRef, dynamicComponent: any): ComponentRef<TraitInterface> {
        return viewContainerRef.createComponent(dynamicComponent);
    }
}
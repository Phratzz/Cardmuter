// shared service to handle rendering and data for canvas field

import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    loadDynamicComponent(viewContainerRef: ViewContainerRef, dynamicComponent: any) {
        viewContainerRef.createComponent(dynamicComponent);
    }
}
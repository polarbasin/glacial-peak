"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
// import { Http } from '@angular/http';
// import { EventService } from './event.service';
// import { ROUTER_DIRECTIVES } from '@angular/router';
let EviewComponent = class EviewComponent {
};
EviewComponent = __decorate([
    core_1.Component({
        selector: 'eview',
        // directives: [ROUTER_DIRECTIVES],
        // providers: [EventService],
        template: `
    <h1>Test Hello</h1>
  `
    }), 
    __metadata('design:paramtypes', [])
], EviewComponent);
exports.EviewComponent = EviewComponent;
//# sourceMappingURL=eview.component.js.map
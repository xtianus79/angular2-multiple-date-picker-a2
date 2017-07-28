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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DateClickedDirective = (function () {
    function DateClickedDirective() {
    }
    DateClickedDirective.prototype.onMouseOver = function () {
        //experimental for later use
        // if (document.getElementsByClassName('picker-selected')[0] !== undefined) {
        //     let part = document.getElementsByClassName('picker-selected')[0];
        //     this.renderer.setElementStyle(part, 'background-color', 'interhit');
        // }
        this.isClicked = true;
    };
    DateClickedDirective.prototype.onMouseOut = function () {
        this.isClicked = false;
    };
    __decorate([
        core_1.HostBinding('class.click-selection-active'),
        __metadata("design:type", Boolean)
    ], DateClickedDirective.prototype, "isClicked", void 0);
    __decorate([
        core_1.HostListener('mouseover'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DateClickedDirective.prototype, "onMouseOver", null);
    __decorate([
        core_1.HostListener('mouseleave'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DateClickedDirective.prototype, "onMouseOut", null);
    DateClickedDirective = __decorate([
        core_1.Directive({
            selector: '[dateClicked]'
        })
        /**
         * DateClickedDirective is used for adding a host binding class to a date that has been clicked by the end user.
         * gives the affect of the button style changing while being clicked
         * future updates pending
         */
        ,
        __metadata("design:paramtypes", [])
    ], DateClickedDirective);
    return DateClickedDirective;
}());
exports.DateClickedDirective = DateClickedDirective;
var DateClickedHelper = (function () {
    // experimental for later use
    function DateClickedHelper() {
    }
    DateClickedHelper.prototype.tester = function () {
    };
    DateClickedHelper = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DateClickedHelper);
    return DateClickedHelper;
}());
exports.DateClickedHelper = DateClickedHelper;
//# sourceMappingURL=date-click-directive.js.map
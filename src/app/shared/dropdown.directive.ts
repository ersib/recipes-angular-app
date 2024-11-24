import { Directive, ElementRef, Host, HostBinding, HostListener, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdowDirective implements OnInit{

    @HostBinding('class.open') activeDropdown = false;

/*     @HostListener('click') toggleOpen() {
        this.activeDropdown = !this.activeDropdown;
    } */

    // Closing dropdown when click from anywhere in document
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.activeDropdown = this.element.nativeElement.contains(event.target) ? !this.activeDropdown : false;
    }

    

    constructor(private element: ElementRef, private render: Renderer2) {
    }



    ngOnInit(): void {
        /* this.element.nativeElement.onclick = () => {
            if (!this.activeDropdown) {
                this.render.addClass(this.element.nativeElement, 'open')
                this.activeDropdown = true;
            } else {
                this.render.removeClass(this.element.nativeElement, 'open')
                this.activeDropdown = false;
            }
        } */
    }




}
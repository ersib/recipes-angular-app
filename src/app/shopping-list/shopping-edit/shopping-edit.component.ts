import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //@ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  //@ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
 // @Output() itemAdded = new EventEmitter<Ingredient>();

  @ViewChild('formRef', { static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIngredientIndex: number;
  editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.onStartedEditingIngredient(index);
    })
  }

  onStartedEditingIngredient(index: number) {
    this.editMode = true;
    this.editedIngredientIndex = index;
    this.editedIngredient = this.shoppingListService.getIngredient(index);
    this.slForm.setValue({
      name: this.editedIngredient.name,
      amount: this.editedIngredient.amount
    })
  }

  onAdd(form: NgForm) {
    /*this.itemAdded.emit({
      name: this.nameInputRef.nativeElement.value,
      amount: this.amountInputRef.nativeElement.value
    });*/
    
    //const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    const value = form.value;
    const newIngredientValue = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIngredientIndex, newIngredientValue);
    } else {
      this.shoppingListService.addIngredient(newIngredientValue);
    }

    this.slForm.reset();
    this.editMode = false;
    
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

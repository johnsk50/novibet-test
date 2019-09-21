import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {CollectionsService} from '../../services/collections.service';

@Component({
  selector: 'app-collection-creation',
  templateUrl: './collection-creation.component.html',
  styleUrls: ['./collection-creation.component.css']
})
export class CollectionCreationComponent implements OnInit {

  //collectionForm: FormGroup;

  constructor(private collectionsService: CollectionsService) { }

  ngOnInit() {
    //this.initializeForm();
  }

  // initializeForm() {
  //   this.collectionForm = new FormGroup({
  //     title: new FormControl('', [Validators.required]),
  //     description: new FormControl('', Validators.required)
  //   });
  // }

  onSubmit(form: NgForm) {
    console.log('form', form);
    // form.value.description

    this.collectionsService.addCollectionToLocal(form.value.title, form.value.description);


    // const {title, description} = this.collectionForm.controls;
    //
    // console.log(title.value, description.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollectionsService } from '../../services/collections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-creation',
  templateUrl: './collection-creation.component.html',
  styleUrls: ['./collection-creation.component.css']
})
export class CollectionCreationComponent implements OnInit {

  //collectionForm: FormGroup;

  constructor(private collectionsService: CollectionsService,
              private router: Router) { }

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

    this.router.navigate(['/collections']);
    // const {title, description} = this.collectionForm.controls;
    //
    // console.log(title.value, description.value);
  }
}

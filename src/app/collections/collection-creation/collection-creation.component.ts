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

  constructor(private collectionsService: CollectionsService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.collectionsService.addCollectionToLocal(form.value.title, form.value.description);

    this.router.navigate(['/collections']);
  }
}

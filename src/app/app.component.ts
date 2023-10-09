import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'semantic-web-app';

  @ViewChild('searchNgForm') searchNgForm: NgForm;
  searchForm: FormGroup;

  search: string

  constructor(
    private _formBuilder:FormBuilder,
    ) 
    { }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      search: ['']
    })
  }
}

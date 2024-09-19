import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Rdf, SparqlQueryModel } from './clients/system-api/UserApiClient.gen';
import { RdfService } from 'src/services/rdf.service';
import { SparqlService } from 'src/services/sparql.service';
import { GeneratorService } from 'src/services/generator.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Semantic search';

  @ViewChild('searchNgForm') searchNgForm: NgForm;
  searchForm: FormGroup;

  search: string
  //list: Array<Rdf> = []
  list: {
      [key: string]: any;
  }[]
  
  subject: string
  predicate: string
  obj: string

  numberOfRecords: number = 0;
  
  rdf: Rdf

  constructor(
    private _formBuilder:FormBuilder,
    private _rdfService: RdfService,
    private _generatorService: GeneratorService,
    private _sparqlService: SparqlService,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) 
    { }

  searchWithSparql() {
    let search = this.search == undefined ? "?subject" : "\""+this.search+"\"";

    let request = new SparqlQueryModel();
    request.sparqlQuery = "PREFIX ex: <http://example.org/> SELECT ?subject ?predicate ?object WHERE { ?s ex:subject "+search+" . ?s ex:predicate ?predicate . ?s ex:obj ?obj . }";

    this._sparqlService.executeSparqlQuery(request).subscribe((data) => {
      this.list = data;

      if (this.list.length == 0) {
        request.sparqlQuery = "PREFIX ex: <http://example.org/> SELECT ?subject ?predicate ?object WHERE { ?s ex:subject ?subject . ?s ex:predicate "+search+" . ?s ex:obj ?obj . }";

        this._sparqlService.executeSparqlQuery(request).subscribe((data) => {
          this.list = data;
    
          if (this.list.length == 0) {
            request.sparqlQuery = "PREFIX ex: <http://example.org/> SELECT ?subject ?predicate ?object WHERE { ?s ex:subject ?subject . ?s ex:predicate ?predicate . ?s ex:obj "+search+" . }";
          
            this._sparqlService.executeSparqlQuery(request).subscribe((data) => {
              this.list = data;
            });
          }
        });
      }
    });
  }

  tripleSearchWithSparql() {

    let subject = this.subject == undefined ? "?subject" : "\""+this.subject+"\"";
    let predicate = this.predicate == undefined ? "?predicate" : "\""+this.predicate+"\"";
    let obj =  this.obj == undefined ? "?obj" : "\""+this.obj+"\"";

    let request = new SparqlQueryModel();
    request.sparqlQuery = "PREFIX ex: <http://example.org/> SELECT ?subject ?predicate ?object WHERE { ?s ex:subject "+subject+" . ?s ex:predicate "+predicate+" . ?s ex:obj "+obj+" . }";

    console.log(request.sparqlQuery);

    this._sparqlService.executeSparqlQuery(request).subscribe((data) => {
      this.list = data;
      console.log(request.sparqlQuery);
    });
  }

  generate() {
    this._generatorService.generator(this.numberOfRecords).subscribe((data) => {

    });
  }

  addRdf() {
    this.rdf.createdAt = new Date();
    this._rdfService.rdfPOST(this.rdf).subscribe((data) => {
      this.searchWithSparql();
      this.tripleSearchWithSparql();

      this._snackBar.open("Success", 'Close', {
        duration: 5000
      });
    });
  }

  removeRdf() {
    this._rdfService.rdfDELETE(this.rdf.id!).subscribe((data) => {
      this.searchWithSparql();
      this.tripleSearchWithSparql();

      this._snackBar.open("Success", 'Close', {
        duration: 5000
      });
    });
  }

  retrieveRdf() {
    this._rdfService.rdfGET(this.rdf.id!).subscribe((data) => {
      this.rdf.subject = data.subject
      this.rdf.predicate = data.predicate
      this.rdf.obj = data.obj
      this.rdf.createdAt = data.createdAt
    });
  }

  updateRdf() {
    this._rdfService.rdfPUT(this.rdf.id!, this.rdf).subscribe((data) => {
      this.searchWithSparql();
      this.tripleSearchWithSparql();

      this._snackBar.open("Success", 'Close', {
        duration: 5000
      });
    });
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      search: [''],

      subject: [''],
      predicate: [''],
      obj: [''],

      numberOfRecords: [''],

      addSubject: [''],
      addPredicate: [''],
      addObj: [''],

      updateSubject: [''],
      updatePredicate: [''],
      updateObj: [''],
    })

    this.rdf = new Rdf();

    this.searchWithSparql();
    this.tripleSearchWithSparql();
  }

  openAddDialog(templateRef: TemplateRef<any>): void {
    this.rdf = new Rdf();
    this._dialog.open(templateRef, {
      width: '550px',
    });
  }

  openUpdateDialog(id: string, templateRef: TemplateRef<any>): void {
    this.rdf.id = id;
    this.retrieveRdf();
    this._dialog.open(templateRef, {
      width: '550px',
    });
  }

  openDeleteDialog(id: string, templateRef: TemplateRef<any>): void {
    this.rdf.id = id;
    this._dialog.open(templateRef, {
      width: '350px',
    });
  }
}

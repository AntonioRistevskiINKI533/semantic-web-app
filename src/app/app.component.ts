import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Rdf, SparqlQueryModel } from './clients/system-api/UserApiClient.gen';
import { RdfService } from 'src/services/book.service';

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

  numberOfRecords: number

  constructor(
    private _formBuilder:FormBuilder,
    private _rdfService: RdfService
    ) 
    { }

  searchWithSparql() {
    let search = this.search == undefined ? "?subject" : "\""+this.search+"\"";

    let request = new SparqlQueryModel();
    request.sparqlQuery = "PREFIX ex: <http://example.org/> SELECT ?subject ?predicate ?object WHERE { ?s ex:subject "+search+" . ?s ex:predicate ?predicate . ?s ex:obj ?obj . }";

    this._rdfService.executeSparqlQuery(request).subscribe((data) => {
      this.list = data;

      if (this.list.length == 0) {
        request.sparqlQuery = "PREFIX ex: <http://example.org/> SELECT ?subject ?predicate ?object WHERE { ?s ex:subject ?subject . ?s ex:predicate "+search+" . ?s ex:obj ?obj . }";

        this._rdfService.executeSparqlQuery(request).subscribe((data) => {
          this.list = data;
    
          if (this.list.length == 0) {
            request.sparqlQuery = "PREFIX ex: <http://example.org/> SELECT ?subject ?predicate ?object WHERE { ?s ex:subject ?subject . ?s ex:predicate ?predicate . ?s ex:obj "+search+" . }";
          
            this._rdfService.executeSparqlQuery(request).subscribe((data) => {
              this.list = data;
            });
          }
        });
      }
    });
  }

  tripleSearchWithSparql() {
    console.log(this.subject);
    console.log(this.predicate);
    console.log(this.obj);

    let subject = this.subject == undefined ? "?subject" : "\""+this.subject+"\"";
    let predicate = this.predicate == undefined ? "?predicate" : "\""+this.predicate+"\"";
    let obj =  this.obj == undefined ? "?obj" : "\""+this.obj+"\"";

    let request = new SparqlQueryModel();
    request.sparqlQuery = "PREFIX ex: <http://example.org/> SELECT ?subject ?predicate ?object WHERE { ?s ex:subject "+subject+" . ?s ex:predicate "+predicate+" . ?s ex:obj "+obj+" . }";

    console.log(request.sparqlQuery);

    this._rdfService.executeSparqlQuery(request).subscribe((data) => {
      this.list = data;
      console.log(request.sparqlQuery);
    });
  }

  generate() {
    this._rdfService.generator(this.numberOfRecords).subscribe((data) => {

    });
  }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      search: [''],
      subject: [''],
      predicate: [''],
      obj: [''],
    })

    this._rdfService.getAll().subscribe((data) => {
      //this.dataSource = new MatTableDataSource<ProductSaleSumsAndProfitViewData>(data.items!);
      //this.totalItems = data.totalItems!;
      // this.list = data;

      //for (var i = 0; i < this.dataSource.data.length; i++) {
      //  this.chartOptions.series!.push(this.dataSource.data[i].profit as number & { x: any; y: any; fillColor?: string | undefined; strokeColor?: string | undefined; meta?: any; goals?: any; } & [number, number | null] & [number, (number | null)[]]);
      //  this.chartOptions.labels!.push(this.dataSource.data[i].name);
      //}

      //this.chart.render();
    });
  }
}

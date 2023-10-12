import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { BookService } from 'src/services/book.service';
import { Book } from './clients/system-api/UserApiClient.gen';

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
  list: Array<Book> = []

  constructor(
    private _formBuilder:FormBuilder,
    private _bookService: BookService
    ) 
    { }

  ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      search: ['']
    })

    this._bookService.getAll().subscribe((data) => {
      //this.dataSource = new MatTableDataSource<ProductSaleSumsAndProfitViewData>(data.items!);
      //this.totalItems = data.totalItems!;
      this.list = data;

      //for (var i = 0; i < this.dataSource.data.length; i++) {
      //  this.chartOptions.series!.push(this.dataSource.data[i].profit as number & { x: any; y: any; fillColor?: string | undefined; strokeColor?: string | undefined; meta?: any; goals?: any; } & [number, number | null] & [number, (number | null)[]]);
      //  this.chartOptions.labels!.push(this.dataSource.data[i].name);
      //}

      //this.chart.render();
    });
  }
}

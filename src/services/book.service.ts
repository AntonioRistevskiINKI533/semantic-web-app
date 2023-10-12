import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Book, Client } from "src/app/clients/system-api/UserApiClient.gen";

@Injectable({
    providedIn: 'root'
})

export class BookService {

    constructor(private userApiClient: Client) { }

    getAll(): Observable<Book[]> {
        return this.userApiClient.booksAll();
    }

}
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Client, SparqlQueryModel } from "src/app/clients/system-api/UserApiClient.gen";

@Injectable({
    providedIn: 'root'
})

export class SparqlService {

    constructor(private userApiClient: Client) { }

    executeSparqlQuery(body: SparqlQueryModel | undefined): Observable<{
        [key: string]: any;
    }[]> {
        return this.userApiClient.executeSparqlQuery(body);
    }

}
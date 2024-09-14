import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Client, Rdf, SparqlQueryModel } from "src/app/clients/system-api/UserApiClient.gen";

@Injectable({
    providedIn: 'root'
})

export class RdfService {

    constructor(private userApiClient: Client) { }

    generator(numberOfRecords: number | undefined): Observable<void> {
        return this.userApiClient.generator(numberOfRecords);
    }

    getAll(): Observable<Rdf[]> {
        return this.userApiClient.rdfAll();
    }

    executeSparqlQuery(body: SparqlQueryModel | undefined): Observable<{
        [key: string]: any;
    }[]> {
        return this.userApiClient.executeSparqlQuery(body);
    }

}
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Client, Rdf } from "src/app/clients/system-api/UserApiClient.gen";

@Injectable({
    providedIn: 'root'
})

export class RdfService {

    constructor(private userApiClient: Client) { }

    getAll(): Observable<Rdf[]> {
        return this.userApiClient.rdfAll();
    }

    rdfDELETE(id: string): Observable<void> {
        return this.userApiClient.rdfDELETE(id);
    }

    rdfGET(id: string): Observable<Rdf> {
        return this.userApiClient.rdfGET(id);
    }

    rdfPOST(body: Rdf | undefined): Observable<void> {
        return this.userApiClient.rdfPOST(body);
    }

    rdfPUT(id: string, body: Rdf | undefined): Observable<void> {
        return this.userApiClient.rdfPUT(id, body);
    }

}
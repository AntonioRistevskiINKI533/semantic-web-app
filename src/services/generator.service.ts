import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Client } from "src/app/clients/system-api/UserApiClient.gen";

@Injectable({
    providedIn: 'root'
})

export class GeneratorService {

    constructor(private userApiClient: Client) { }

    generator(numberOfRecords: number | undefined): Observable<void> {
        return this.userApiClient.generator(numberOfRecords);
    }

}
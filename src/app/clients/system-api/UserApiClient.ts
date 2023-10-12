import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Client } from "./UserApiClient.gen";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserApiClient extends Client {
    [x: string]: any;
  
    constructor(private httpClient : HttpClient) {
      super(httpClient, environment.apiUrl);
    }
}

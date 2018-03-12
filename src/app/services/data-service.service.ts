import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// env
import { environment } from "../../environments/environment.dev";
import { Observable } from "rxjs/Observable";
import { Repository } from "../models/repository.interface";

@Injectable()
export class DataService {
  private static API: String = environment.api;

  constructor(private http: HttpClient) {}

  getRepository(id: String): Observable<Repository> {
    return this.http.get<Repository>(`${DataService.API}/repos/${id}`);
  }
}

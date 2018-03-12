import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

// models
import { Repository } from "../models/repository.interface";

// env
import { environment } from "../../environments/environment.dev";

@Injectable()
export class DataService {
  private static API: string = environment.api;

  constructor(private http: HttpClient) {}

  getRepository(id: string): Observable<Repository> {
    return this.http.get<Repository>(`${DataService.API}/repos/${id}`);
  }
}

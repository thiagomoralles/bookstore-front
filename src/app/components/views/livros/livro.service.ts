import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Livro } from "./livro.model";

@Injectable({
  providedIn: "root",
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) {}

  findAllByCategoria(idCategoria: string): Observable<Livro[]> {
    const url = `${this.baseUrl}/livro/findAllByCategoria`
    let params = new HttpParams()
      .set('idCategoria', idCategoria)
    return this.http.get<Livro[]>(url, {params});
  }

}

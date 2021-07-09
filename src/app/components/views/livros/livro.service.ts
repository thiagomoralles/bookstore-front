import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Livro } from "./livro.model";

@Injectable({
  providedIn: "root",
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient, 
    private snack: MatSnackBar
  ) {}

  findAllByCategoria(idCategoria: string): Observable<Livro[]> {
    const url = `${this.baseUrl}/livro/findAllByCategoria`
    let params = new HttpParams()
      .set('idCategoria', idCategoria)
    return this.http.get<Livro[]>(url, {params});
  }

  findById(id: String): Observable<Livro> {
    const url = `${this.baseUrl}/livro/${id}`
    return this.http.get<Livro>(url);
  }

  create(idCategoria: string, livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/livro/create`
    let params = new HttpParams()
      .set('categoria', idCategoria)
    return this.http.post<Livro>(url, livro, {params});
  }

  update(id: String, livro: Livro): Observable<Livro> {
    const url = `${this.baseUrl}/livro/update/${id}`
    return this.http.put<Livro>(url, livro);
  }

  apresentarMensagem(msg: String) {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/categoria/findAll`
    return this.http.get<Categoria[]>(url);
  }

  findById(id: String): Observable<Categoria> {
    const url = `${this.baseUrl}/categoria/${id}`;
    return this.http.get<Categoria>(url);
  }

  create(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/categoria/create`
    return this.http.post<Categoria>(url, categoria);
  }

  delete(id: String): Observable<void> {
    const url = `${this.baseUrl}/categoria/${id}`;
    return this.http.delete<void>(url);
  }

  update(id: String, categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/categoria/update/${id}`
    return this.http.put<Categoria>(url, categoria);
  }

  apresentarMensagem(msg: String) {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}

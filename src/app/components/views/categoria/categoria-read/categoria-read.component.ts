import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];
  categorias: Categoria[] = [];

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.categoriaService.findAll().subscribe(resp => {
      console.log(resp);
      this.categorias = resp;
    })
  }
}

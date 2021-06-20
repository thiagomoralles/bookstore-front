import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.categoriaService.findById(this.categoria.id!).subscribe(resposta => {
      this.categoria.nome = resposta.nome;
      this.categoria.descricao= resposta.descricao;
    })
  }

  delete(): void {
    this.categoriaService.delete(this.categoria.id!).subscribe(resposta => {
      this.router.navigate(['categorias']);
      this.categoriaService.apresentarMensagem('Categoria deletada com sucesso!');
    }, exception => {
      console.log(exception);
      this.categoriaService.apresentarMensagem(exception.error.error);
    })
  }

  cancelar(): void {
    this.router.navigate(['categorias']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

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

  cancelar(): void {
    this.router.navigate(['categorias']);
  }

  update(): void {
    this.categoriaService.update(this.categoria.id!, this.categoria).subscribe(resposta => {
      this.categoria.nome = resposta.nome,
      this.categoria.descricao = resposta.descricao,
      this.cancelar();
      this.categoriaService.apresentarMensagem("Categoria atualizada com sucesso!");
    }, exception => {
      console.log(exception);
      //this.categoriaService.apresentarMensagem(exception.error.error);
      for (var i = 0; i < exception.error.fieldErrors.length; i++) {
        this.categoriaService.apresentarMensagem(exception.error.fieldErrors[i].message)
      }
    }) 
  }
}

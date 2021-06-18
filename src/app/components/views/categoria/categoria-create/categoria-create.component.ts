import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {
  
  categoria: Categoria = {
    nome: '',
    descricao: '',
  }

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.categoriaService.create(this.categoria).subscribe(resposta => {
      console.log(resposta)
      this.router.navigate(['categorias'])
      this.categoriaService.apresentarMensagem('Categoria criada com sucesso!');
    }, err => {
      for (let i = 0; i < err.error.fieldErrors.length; i++) {
        this.categoriaService.apresentarMensagem(err.error.fieldErrors[i].message);
      }
      
    })
  }

  cancelar(): void {
    this.router.navigate(['categorias']);
  }

}

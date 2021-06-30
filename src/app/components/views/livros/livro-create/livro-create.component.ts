import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo = new FormControl('', [Validators.minLength(3)]);
  nomeAutor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  livro: Livro = {
    titulo: '',
    nomeAutor: '',
    texto: ''
  }
  idCategoria: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private livroService: LivroService
  ) { }

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get("idCategoria")!;
  }

  getMenssage() {
    if (this.titulo.invalid) {
      return "O campo TITULO deve conter entre 3 e 100 caracteres.";
    }
    if (this.nomeAutor.invalid) {
      return "O campo AUTOR deve conter entre 3 e 100 caracteres.";
    }
    if (this.texto.invalid) {
      return "O campo TEXTO deve conter entre 10 e 100 caracteres.";
    }
    return false;
  }

  cancelar() {
    this.router.navigate([`categorias/${this.idCategoria}/livros`]);
  }

  create(): void {
    this.livroService.create(this.idCategoria, this.livro).subscribe((resposta) => {
      this.cancelar();
      this.livroService.apresentarMensagem("Livro criado com sucesso!");
    }, (exception) => {
      for (let i = 0; i < exception.error.fieldErrors.length; i++) {
        this.livroService.apresentarMensagem(exception.error.fieldErrors[i].message);
      }
    })
  }

}

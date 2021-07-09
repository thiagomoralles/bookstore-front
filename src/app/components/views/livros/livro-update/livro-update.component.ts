import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../categoria/categoria.service';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  titulo = new FormControl('', [Validators.minLength(3)]);
  nomeAutor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);

  livro: Livro = {
    titulo: '',
    nomeAutor: '',
    texto: '',

    categoria: {
      nome: '',
      descricao: '',
    }
  }
  idCategoria: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private livroService: LivroService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get("idCategoria")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.livroService.findById(this.livro.id!).subscribe((resposta) => {
      console.log("livro: "+resposta);
      console.log("livro.categoria: "+resposta.categoria);
      this.livro = resposta;
      this.livro.categoria = resposta.categoria;
    })
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

  update(): void {
    this.livroService.update(this.livro.id!, this.livro).subscribe((resposta) => {
      this.cancelar();
      this.livroService.apresentarMensagem("Livro atualizado com sucesso!");
    }, (exception) => {
      for (let i = 0; i < exception.error.fieldErrors.length; i++) {
        this.livroService.apresentarMensagem(exception.error.fieldErrors[i].message);
      }
    })
  }

}

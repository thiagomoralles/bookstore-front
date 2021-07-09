import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-read-all",
  templateUrl: "./livro-read-all.component.html",
  styleUrls: ["./livro-read-all.component.css"],
})
export class LivroReadAllComponent implements OnInit {
  displayedColumns: string[] = ["id", "titulo", "livros", "acoes"];
  idCategoria: string = "";
  livros: Livro[] = [];

  constructor(
    private route: ActivatedRoute,
    private livroSevice: LivroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.paramMap.get("idCategoria")!;
    this.findByAllByCategoria();
  }

  findByAllByCategoria(): void {
    this.livroSevice.findAllByCategoria(this.idCategoria).subscribe((resposta) => {
      //console.log(resposta)
      this.livros = resposta;
    })
  }

  navegarParaNovoLivro(): void {
    this.router.navigate([`categorias/${this.idCategoria}/livros/create`]);
  }

}

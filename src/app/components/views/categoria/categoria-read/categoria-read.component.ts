import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Categoria } from "../categoria.model";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-categoria-read",
  templateUrl: "./categoria-read.component.html",
  styleUrls: ["./categoria-read.component.css"],
})
export class CategoriaReadComponent implements OnInit {

  displayedColumns: string[] = ["id", "nome", "descricao", "livros", "acoes"];
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.categoriaService.findAll().subscribe((resp) => {
      //console.log(resp);
      this.categorias = resp;
    });
  }

  navegarParaCategoriaCreate() {
    this.router.navigate(["categorias/create"]);
  }
}

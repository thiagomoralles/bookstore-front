import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriaCreateComponent } from "./components/views/categoria/categoria-create/categoria-create.component";
import { CategoriaDeleteComponent } from "./components/views/categoria/categoria-delete/categoria-delete.component";
import { CategoriaReadComponent } from "./components/views/categoria/categoria-read/categoria-read.component";
import { CategoriaUpdateComponent } from "./components/views/categoria/categoria-update/categoria-update.component";
import { HomeComponent } from "./components/views/home/home.component";
import { LivroCreateComponent } from "./components/views/livros/livro-create/livro-create.component";
import { LivroReadAllComponent } from "./components/views/livros/livro-read-all/livro-read-all.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'categorias', component: CategoriaReadComponent
  },
  {
    path: 'categorias/create', component: CategoriaCreateComponent
  },
  {
    path: 'categorias/delete/:id', component: CategoriaDeleteComponent
  },
  {
    path: 'categorias/update/:id', component: CategoriaUpdateComponent
  },
  {
    path: 'categorias/:idCategoria/livros', component: LivroReadAllComponent
  },
  {
    path: 'categorias/:idCategoria/livros/create', component: LivroCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

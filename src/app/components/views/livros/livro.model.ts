import { Categoria } from "../categoria/categoria.model";

export interface Livro {
    id?: String
    titulo: String
    nomeAutor: String
    texto: String

    categoria?: Categoria 
}
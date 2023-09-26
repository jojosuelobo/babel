// eslint-disable-next-line no-unused-vars
import styles from './NewPost.module.sass'

import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

export default function NewPost() {
    const [titulo, setTitulo] = useState('')
    //const [tag, setTag] = useState([])
    const [descricao, setDescricao] = useState('')
    const url = 'http://localhost:3000/posts'
    const { httpConfig, loading } = useFetch(url);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const idPost = Math.floor(Math.random() * 1000)
        const post = {
            id: idPost,
            titulo,
            data_postagem: "2023-09-20",
            tags_relacionadas: [
                "receitas",
                "culinária",
                "aperitivos"
            ],
            descricao,
            nome_usuario: "JOJOSUELOBO",
            itens_lista: [
                {
                    nome_item: "One Piece",
                    descricao_item: "Anime de pirata que estica"
                },
                {
                    nome_item: "Naruto",
                    descricao_item: "Alguma coisa sobre ninjas"
                },
                {
                    nome_item: "Fluminense",
                    descricao_item: "Salve o corintianssssss o campeão dos campeoesssssssssss"
                },
            ]
        }

        httpConfig(post, "POST")

        // Clear dos campos
    }

    return (
        <div>
            <h1>NewPost</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Título
                    <input type="text" onChange={(e) => setTitulo(e.target.value)} />
                </label>
                
                <label>
                    Descrição
                    <input type="text" onChange={(e) => setDescricao(e.target.value)} />
                </label>
                {loading ? <p>Aguarde!</p> : <input type="submit" value="Criar" />}
            </form>
        </div>
    )
}

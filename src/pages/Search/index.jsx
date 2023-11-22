import { useState, useEffect } from 'react'
import styles from './Search.module.sass'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { Link } from 'react-router-dom'

// Component
import Header from '../../components/header'
import PostDetail from '../../components/postDetail'

// Hooks
import backend from '../../axios/config'
import { useQuery } from '../../firebase/useQuery'

export default function Search() {
    const query = useQuery()
    const search = query.get("q")

    const [posts, setPosts] = useState([])
    const [tag, setTags] = useState([])

    const getPosts = async () => {
        try {
            console.log(search)
            console.log(typeof(search))
            var dados = {"tags" : converterParaLista(search)}
            var jsonString = JSON.stringify(dados)
            console.log(jsonString)
            const response = await backend.put(`/posts/busca`, jsonString)
            const data = response.data
            setPosts(data)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    // Função para converter a string em uma lista de strings
    function converterParaLista(str) {
        // Verificando se a entrada é uma string
        if (typeof str !== 'string') {
            console.error('A entrada não é uma string.');
            return [];
        }
        // Usando o método split para dividir a string com base na vírgula e remover espaços em branco
        var lista = str.split(',').map(function(item) {
            // Removendo espaços em branco no início e no final de cada item
            return item.trim();
        }).filter(function(item) {
            // Filtrando itens vazios
            return item !== '';
        });

        // Retornando a lista resultante
        return lista;
    }

    useEffect(() => {
        getPosts()
    }, [])
    return (
        <>
            <Header />
            <div className={styles.result}>
                <Link to={'/'}> <IoMdArrowRoundBack className={styles.icon} /> </Link>
                <h1>Resultados de busca por: {search}</h1>
            </div>
            <div className={styles.feed}>
                {posts.length === 0 ? (
                    <div>
                        <h1>Não há posts a serem exibidos</h1>
                    </div>
                ) : (
                    posts.map((post) => <PostDetail key={post.idLista} post={post} />)
                )}
            </div>

        </>
    )
}

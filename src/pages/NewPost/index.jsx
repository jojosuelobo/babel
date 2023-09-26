// eslint-disable-next-line no-unused-vars
import styles from './NewPost.module.sass'

import moment from 'moment/moment'
import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Link } from 'react-router-dom'

// Icons
import { IoMdArrowRoundBack } from 'react-icons/io'

// Components
import Header from '../../components/header'

export default function NewPost() {
    const teste = () => {
        const tagArray = tagInput.split(",").map((tag) => tag.trim())
        const filteredTags = tagArray.filter((tag) => tag !== "");
        setTags(filteredTags);
    }

    const [titulo, setTitulo] = useState('')
    const dataPostagem = moment().format('L')
    const [tagInput, setTagInput] = useState('')
    const [tag, setTags] = useState([])
    const [descricao, setDescricao] = useState('')
    const url = 'http://localhost:3000/posts'
    const { httpConfig, loading } = useFetch(url)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tagArray = tagInput.split(",").map((tag) => tag.trim())
        const filteredTags = tagArray.filter((tag) => tag !== "");
        setTags(filteredTags);

        const idPost = Math.floor(Math.random() * 1000)
        const post = {
            id: idPost,
            titulo,
            data_postagem: dataPostagem,
            tags_relacionadas: tag,
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

        console.log(post)
        httpConfig(post, "POST")

        // Clear dos campos
    }

    return (
        <>
            <Header />
            <div className={styles.section}>
                <div className={styles.post}>
                    <div className={styles.header}>
                        <Link to={'/'}> <IoMdArrowRoundBack className={styles.icon} /></Link>
                        <h1>Nova lista</h1>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.title}>
                            Título
                            <input type="text" onChange={(e) => setTitulo(e.target.value)} />
                        </label>

                        <label className={styles.tags}>
                            Tags
                            <input
                                type="text"
                                onChange={(e) => setTagInput(e.target.value)}
                            />
                        </label>

                        <label className={styles.descricao}>
                            Descrição
                            <textarea  type="text" onChange={(e) => setDescricao(e.target.value)} ></textarea>
                        </label>
                        {loading ? <p>Aguarde!</p> : <input className={styles.submit} type="submit" value="Criar" />}
                    </form>
                </div>
            </div>
        </>
    )
}

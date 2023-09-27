/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import styles from './NewPost.module.sass'

// lib
import moment from 'moment/moment'

// hooks
import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'

// react router dom
import { Link } from 'react-router-dom'

// Icons
import { IoMdArrowRoundBack } from 'react-icons/io'

// Components
import Header from '../../components/header'

// Firebase
import { getAuth } from "firebase/auth";

export default function NewPost() {

    const [titulo, setTitulo] = useState('')
    const dataPostagem = moment().format('L')
    const [tagInput, setTagInput] = useState('')
    const [tag, setTags] = useState([])
    const [descricao, setDescricao] = useState('')

    const url = 'http://localhost:3000/posts'
    const { httpConfig, loading } = useFetch(url)

    // Nome de usuário
    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName

    // Listagem de fato
    const [quantidadeDeItensLista, setQuantidadeDeItensLista] = useState(3)
    const [lista, setLista] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault();

        // LÓGICA DE TAGS 
        /*
        setTags(
            (tagInput.split(",").map((tag) => tag.trim()))
                .filter((tag) => tag !== "")
        ) */
        //const tagArray = tagInput.split(",").map((tag) => tag.trim())
        //const filteredTags = tagArray.filter((tag) => tag !== "");
        //setTags(filteredTags);

        // ID
        const idPost = Math.floor(Math.random() * 1000)


        const post = {
            id: idPost,
            titulo,
            data_postagem: dataPostagem,
            tags_relacionadas: tag,
            descricao,
            nome_usuario: displayName,
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
        console.log(displayName)
        //httpConfig(post, "POST")

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
                                // Lógica disto está dentro do handleSubmit
                                // PS: Isto está horrivelmente maravilhosamente funcionando, é oque importa!
                                onChange={(e) =>
                                    setTags(
                                        ((e.target.value).split(",").map((tag) => tag.trim()))
                                            .filter((tag) => tag !== "")
                                    )
                                }
                            />
                        </label>

                        <label className={styles.descricao}>
                            Descrição
                            <textarea className={styles.text} type="text" onChange={(e) => setDescricao(e.target.value)} ></textarea>
                        </label>

                        <div className={styles.itens}>
                            
                            {Array.from({ length: quantidadeDeItensLista }, (_, index) => (
                                <div className={styles.item_lista} key={index}>
                                    <label className={styles.item_tit}>
                                        Título {index+1}
                                        <input type="text" className={styles.item_input} />
                                    </label>
                                    <label className={styles.descricao}>
                                        Descrição
                                        <textarea type="text" className={styles.item_text}></textarea>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className={styles.botoes}>
                            <button onClick={() => setQuantidadeDeItensLista(quantidadeDeItensLista + 1)} className={styles.submit}>Adicionar item</button>
                            <button  onClick={() => setQuantidadeDeItensLista(quantidadeDeItensLista - 1)} className={styles.submit}>Remover item</button>
                            {loading ? <p>Aguarde!</p>
                                : <input className={styles.submit} type="submit" value="Criar" />}
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}

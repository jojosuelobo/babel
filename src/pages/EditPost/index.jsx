/* eslint-disable no-unused-vars */
import styles from './Edit.module.sass'

import profile from '../../../public/logoUVV.png'

// lib
import moment from 'moment/moment'


// Icons
import { IoMdArrowRoundBack } from 'react-icons/io'

// React router dom
import { Link } from 'react-router-dom'

// Hooks
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import blogFetch from '../../axios/config'
import { useFetch } from '../../hooks/useFetch'

// Components
import Header from '../../components/header'
import Aside from '../../components/asideCustom'

// Firebase
import { getAuth } from "firebase/auth";


export default function Edit() {
    const url = 'http://localhost:3000/posts'
    const { httpConfig, loading } = useFetch(url)

    const { id } = useParams()

    const [post, setPost] = useState([])
    const [tag, setTags] = useState([])
    const [lista, setLista] = useState([])


    const getPosts = async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`)
            const data = response.data
            setPost(data)
            setLista(data.itens_lista)
        } catch (err) {
            console.log(err)
        }
    }

    // Nome de usuário
    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName

    // Data e dia
    const dataPostagem = moment().format('L')

    useEffect(() => {
        getPosts()
    }, [])

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    // const [lista, setLista] = useState([])

    //setTag(post.tags_relacionadas)


    const handleSubmit = async () => {

        const novoId = parseInt(id, 10)

        const post = {
            id: novoId+1,
            titulo,
            data_postagem: dataPostagem,
            tags_relacionadas: tag,
            descricao,
            nome_usuario: displayName,
            itens_lista: lista
            // itens_lista: [
            //     {
            //         nome_item: "One Piece",
            //         descricao_item: "Anime de pirata que estica"
            //     },
            //     {
            //         nome_item: "Naruto",
            //         descricao_item: "Alguma coisa sobre ninjas"
            //     },
            // ]
        }

        console.log(post)
        await httpConfig(id, "DELETE")
        await httpConfig(post, "POST")
        //httpConfig(post, "PUT")

    }

    return (
        <>
            <Header />
            <div className={styles.section}>
                <div className={styles.post}>
                    <div className={styles.icons}>
                        <Link to={'/'}> <IoMdArrowRoundBack className={styles.icon} /> </Link>
                    </div>
                    <h2>Título</h2>
                    <input onChange={(e) => setTitulo(e.target.value)} className={styles.title} />
                    <p className={styles.date}>{dataPostagem}</p>
                    <label className={styles.tags}>
                        Tags
                        <input
                            // PS: Isto está horrivelmente maravilhosamente funcionando, é oque importa!
                            onChange={(e) =>
                                setTags(
                                    ((e.target.value).split(",").map((tag) => tag.trim()))
                                        .filter((tag) => tag !== "")
                                )
                            }
                        />
                    </label>
                    <p>Descrição</p>
                    <textarea onChange={(e) => setDescricao(e.target.value)} className={styles.desc}>{post.descricao}</textarea>

                    <div className={styles.list}>
                        <ul>
                            {post.itens_lista?.map((item) => (
                                <li key={item.nome_item}>
                                    <h1>{item.nome_item}</h1>
                                    <p>{item.descricao_item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleSubmit}>SALVAR</button>
                </div>

                <div className={styles.coment}>
                </div>
            </div>
        </>
    )
}

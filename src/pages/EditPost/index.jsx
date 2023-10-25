/* eslint-disable no-unused-vars */
import styles from './Edit.module.sass'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import profile from '../../../public/logoUVV.png'

// lib
import moment from 'moment/moment'

// Icons
import { IoMdArrowRoundBack } from 'react-icons/io'

// React router dom
import { Link, useNavigate } from 'react-router-dom'

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

// Supabase
import { useAuthentication } from '../../supabase/useAuth';

// Backend
import backend from '../../axios/config'


export default function Edit() {
    // const url = 'http://localhost:3000/posts'
    // const { httpConfig, loading } = useFetch(url)

    const { id } = useParams()

    const [post, setPost] = useState({})
    const [lista, setLista] = useState([])
    const [sessionId, setSessionId] = useState()

    

    const navigate = useNavigate()

    // const getPosts = async () => {
    //     try {
    //         const response = await backend.get(`/posts/id?idLista=${id}`)
    //         const data = response.data
    //         setPost(data)
    //         setLista(data.itens_lista)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const getPosts = async () => {
        try {
            const response = await backend.get(`/posts/id?idLista=${id}`)
            const data = response.data

            setPost(data)
        } catch (err) {
            console.log(err)
        }
    }

    // Nome de usuário
    const auth = useAuthentication();
    const user = getUser().then(result => setSessionId(result));

    async function getUser()
    {
        const user = await auth.getUserId();
        
        return user
    }


    // Data e dia
    const dataPostagem = moment().format('L')



    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getPosts()
    }, []);

    useEffect(() => {
        setTitulo(post.titulo);
        setDescricao(post.descricao);
        setTags(post.tags_relacionadas);
    }, [post]);

    //setTag(post.tags_relacionadas)
    console.log(sessionId)

    const handleSubmit = async () => {

        try {
            await backend.put(`/edit/id?idLista=${id}`,{
                titulo,
                conteudo: lista,
                numLikes: 0,
                idUsuario: sessionId,
                tags: tag,
                descricao
            });
            navigate('/');
        } catch (error) {
            console.log(error)
        }

        //httpConfig(post, "PUT")
    }

    return (
        <>
            <Header />
            <div className={styles.section}>
                <div className={styles.post}>
                    <div className={styles.postContent}>
                        <div className={styles.icons}>
                            <Link to={`/posts/${id}`}> <IoMdArrowRoundBack className={styles.icon} /> </Link>
                        </div>
                        <div className={styles.upperForm}>
                            <h2>Título</h2>
                            <input onChange={(e) => setTitulo(e.target.value)}
                                value={titulo}
                                className={styles.title} />
                            <p className={styles.date}>{dataPostagem}</p>
                            <label className={styles.tags}>
                                Tags
                                <input
                                    // PS: Isto está horrivelmente maravilhosamente funcionando, é oque importa!
                                    value={tags}
                                    onChange={(e) => {
                                        const tagInput = e.target.value;
                                        setTags(
                                            tagInput.split(",").map((tag) => tag.trim()))
                                            .filter((tag) => tag !== "")
                                    }

                                    }
                                />
                            </label>
                            <p>Descrição</p>
                            <textarea onChange={(e) => setDescricao(e.target.value)}
                                className={styles.desc} value={descricao}
                            >{post.descricao}</textarea>
                        </div>
                        <div className={styles.list}>
                            <ul>
                                {post.itens_lista?.map((item, index) => (
                                    <li key={index}>
                                        <div className={styles.item_lista} >
                                            <label className={styles.item_tit}>
                                                Título {index + 1}
                                                <input
                                                    type="text"
                                                    className={styles.item_input}
                                                    value={item.nome_item}
                                                    onChange={(e) => {
                                                        const newList = [...lista];
                                                        newList[index].nome_item = e.target.value;
                                                        setLista(newList);
                                                    }}
                                                />
                                            </label>
                                            <label className={styles.descricao}>
                                                Descrição
                                                <textarea
                                                    type="text"
                                                    className={styles.item_text}
                                                    value={item.descricao_item}
                                                    onChange={(e) => {
                                                        const newList = [...lista];
                                                        newList[index].descricao_item = e.target.value;
                                                        setLista(newList);
                                                    }}
                                                ></textarea>
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button onClick={handleSubmit}>SALVAR</button>
                    </div>
                </div>

                <div className={styles.coment}>
                </div>
            </div>
        </>
    )
}
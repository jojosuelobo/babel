/* eslint-disable no-unused-vars */
import styles from './Edit.module.sass'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import profile from '../../../public/logoUVV.png'

// lib
import moment from 'moment/moment'

// Icons
import { IoMdArrowRoundBack, IoIosRemoveCircle } from 'react-icons/io'

// React router dom
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Components
import Header from '../../components/header'

// Supabase
import { useAuthentication } from '../../supabase/useAuth';

// Backend
import backend from '../../axios/config'


export default function Edit() {

    const { id } = useParams()

    const [post, setPost] = useState({})
    const [lista, setLista] = useState([])
    const [sessionId, setSessionId] = useState()



    const navigate = useNavigate()

    const getPosts = async () => {
        try {
            const response = await backend.get(`/posts/id?idLista=${id}`)
            const data = response.data

            setPost(data)
            setLista(data.conteudo)
        } catch (err) {
            console.log(err)
        }
    }

    // Nome de usuário
    const auth = useAuthentication();
    const user = getUser().then(result => setSessionId(result));

    async function getUser() {
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
        setTags(post.tags);
    }, [post]);

    //setTag(post.tags_relacionadas)
    console.log(sessionId)

    const handleSubmit = async () => {

        try {
            await backend.put(`/edit/id?idLista=${id}`, {
                titulo,
                conteudo: lista,
                numLikes: 0,
                idUsuario: sessionId,
                tags: tags,
                descricao
            });
            navigate('/');
        } catch (error) {
            console.log(error)
        }

        //httpConfig(post, "PUT")
    }

    //const conditionalClassName = true ? styles.itemLista : styles.itemListaOculta;
    const [conditionalIndex, setConditionalIndex] = useState(null)
    const [conditionalClassName, setConditionalClassName] = useState([styles.itemLista])

    const handleDelete = async (i) => {
        if (lista.length > 2) {
            setConditionalIndex(i)
            
            const novaLista = [...lista];
            novaLista.splice(i, 1);
            setLista(novaLista);
        }
    }

    const handleSoma = () => {
        let novoItem = { nomeItem: 'ITEM NOVO HEHE', descricaoItem: 'DESC DO ITEM NOVO HAHA' }
        setLista([...lista, novoItem])
        console.log('ta indo')
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
                                {post.conteudo?.map((item, index) => (
                                    <li key={index}>
                                        {/* <div className={conditionalClassName} > */}
                                        <div className={index === conditionalIndex ? styles.itemListaOculta : styles.itemLista}>
                                            <IoIosRemoveCircle onClick={() => handleDelete(index)} className={styles.icons} />
                                            <label className={styles.item_tit}>
                                                Título {index + 1}
                                                <input
                                                    type="text"
                                                    className={styles.item_input}
                                                    placeholder={item.nomeItem}
                                                    onChange={(e) => {
                                                        const newList = [...lista];
                                                        newList[index].nomeItem = e.target.value;
                                                        setLista(newList);
                                                    }}
                                                />
                                            </label>
                                            <label className={styles.descricao}>
                                                Descrição
                                                <textarea
                                                    type="text"
                                                    className={styles.item_text}
                                                    placeholder={item.descricaoItem}
                                                    onChange={(e) => {
                                                        const newList = [...lista];
                                                        newList[index].descricaoItem = e.target.value;
                                                        setLista(newList);
                                                    }}
                                                ></textarea>
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleSoma()} className={styles.addRem}>Adicionar item</button>
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
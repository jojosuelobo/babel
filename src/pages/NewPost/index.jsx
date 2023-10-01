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
    const [quantidadeDeItensLista, setQuantidadeDeItensLista] = useState(2)
    const [lista, setLista] = useState([]);

    // Atualiza a lista sempre que quantidadeDeItensLista mudar
    useEffect(() => {
        const novaLista = Array.from({ length: quantidadeDeItensLista }, () => ({
            nome_item: 'p',
            descricao_item: 'pp'
        }));
        setLista(novaLista);
    }, [quantidadeDeItensLista]);

    // const [lista, setLista] = useState([
    //     {
    //         nome_item: '',
    //         descricao_item: ''
    //     },
    //     {
    //         nome_item: '',
    //         descricao_item: ''
    //     },
    //     {
    //         nome_item: '',
    //         descricao_item: ''
    //     }
    // ])


    const handleSubmit = (e) => {
        e.preventDefault();

        // ID
        const idPost = Math.floor(Math.random() * 1000)


        const post = {
            id: idPost,
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
            //     {
            //         nome_item: "Fluminense",
            //         descricao_item: "Salve o corintianssssss o campeão dos campeoesssssssssss"
            //     },
            // ]
        }

        console.log(post)
        //httpConfig(post, "POST")

        // Clear dos campos
    }

    
    const preencher = () => {
        setQuantidadeDeItensLista(3)
        setTitulo('Melhores receitas com morango')
        //setTags((('receitas,culinária,sobremesa').split(",").map((tag) => tag.trim())).filter((tag) => tag !== ""))
        setDescricao('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis massa sem, fermentum eu egestas in, luctus vitae nibh. Mauris viverra erat velit, nec suscipit nunc finibus consectetur. Nam quis malesuada nisl. Suspendisse at velit id ex semper convallis. Aliquam efficitur leo sit amet gravida dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis non feugiat quam. In tincidunt ullamcorper felis, nec elementum nisl ultrices at. Proin auctor sagittis tortor, at elementum ante venenatis id. Nam convallis, enim eu viverra lacinia, enim sapien eleifend purus, sit amet imperdiet orci arcu at enim. Fusce vestibulum tellus sit amet augue ultrices cursus. Donec eget lorem bibendum, cursus urna congue, feugiat neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.')
    }

    return (
        <>
            <Header />
            <div className={styles.section}>
                <div className={styles.post}>
                    <div className={styles.header}>
                        <Link to={'/'}> <IoMdArrowRoundBack className={styles.icon} /></Link>
                        <h1>Nova lista</h1>
                        <button onClick={preencher}>auto preencher</button>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.title}>
                            Título
                            <input value={titulo} type="text" onChange={(e) => setTitulo(e.target.value)} />
                        </label>

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

                        <label className={styles.descricao}>
                            Descrição
                            <textarea value={descricao} className={styles.text} type="text" onChange={(e) => setDescricao(e.target.value)} ></textarea>
                        </label>

                        <div className={styles.itens}>

                            {lista.map((item, index) => (
                                <div className={styles.item_lista} key={index}>
                                <label className={styles.item_tit}>
                                    Título {index + 1}
                                    <input
                                        type="text"
                                        className={styles.item_input}
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
                                        onChange={(e) => {
                                            const newList = [...lista];
                                            newList[index].descricao_item = e.target.value;
                                            setLista(newList);
                                        }}
                                    ></textarea>
                                </label>
                            </div>
                            ))}

                           {/* {Array.from({ length: quantidadeDeItensLista }, (_, index) => (
                                <div className={styles.item_lista} key={index}>
                                    <label className={styles.item_tit}>
                                        Título {index + 1}
                                        <input
                                            type="text"
                                            className={styles.item_input}
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
                                            onChange={(e) => {
                                                const newList = [...lista];
                                                newList[index].descricao_item = e.target.value;
                                                setLista(newList);
                                            }}
                                        ></textarea>
                                    </label>
                                </div>
                                        ))} */}
                        </div>

                        <div className={styles.botoes}>

                            {loading ? <p>Aguarde!</p>
                                : <input className={styles.submit} type="submit" value="Criar" />}
                        </div>
                    </form>
                    <button onClick={() => setQuantidadeDeItensLista(quantidadeDeItensLista + 1)} className={styles.submit}>Adicionar item</button>
                    <button onClick={() => setQuantidadeDeItensLista(quantidadeDeItensLista - 1)} className={styles.submit}>Remover item</button>
                </div>

            </div>
        </>
    )
}

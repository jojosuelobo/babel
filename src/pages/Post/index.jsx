import styles from './Post.module.sass'
import profile from '../../../public/logoUVV.png'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { Link } from 'react-router-dom'

// Hooks
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import backend from '../../axios/config'

// Components
import Header from '../../components/header'
import Aside from '../../components/asideCustom'


export default function Post() {
    const { id } = useParams()

    const [post, setPost] = useState([])

    const getPosts = async () => {
        try {
            const response = await backend.get(`/posts/id?idLista=${id}`)
            const data = response.data
            setPost(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <Header />
            <div className={styles.section}>
                <Aside />
                <div className={styles.post}>
                    <Link to={'/'}> <IoMdArrowRoundBack className={styles.icon} /> </Link>
                    <h2 className={styles.title}>{post.titulo}</h2>
                    <p className={styles.date}>{post.dataCriacao}</p>

                    <div className={styles.tags}>
                        {post.tags?.map((tag) => (
                            <p className={styles.tag} key={tag}>{tag}</p>
                        ))}
                    </div>
                    <p className={styles.desc}>{post.descricao}</p>

                    <div className={styles.list}>
                        <ul>
                            {post.conteudo?.map((item) => (
                                <li key={item.nomeItem}>
                                    <h1>{item.nomeItem}</h1>
                                    <p>{item.descricaoItem}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.post_footer}>
                        <div className={styles.profile_info}>
                            <img className={styles.profile_pic} src={profile} alt="" />
                            <p className={styles.username}>{post.nome_usuario}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.coment}>

                </div>
            </div>
        </>
    )
}

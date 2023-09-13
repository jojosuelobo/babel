import styles from './Post.module.sass'
import profile from '../../../public/logoUVV.png'

// Hooks
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import blogFetch from '../../axios/config'

// Components
import Header from '../../components/header'
import Aside from '../../components/asideCustom'


export default function Post() {
    const { id } = useParams()

    const [post, setPost] = useState([])

    const getPosts = async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`)
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
                <h2 className={styles.title}>{post.titulo}</h2>
                <p className={styles.date}>{post.data_postagem}</p>
                
                <div className={styles.tags}>
                    {post.tags_relacionadas?.map((tag) => (
                        <p className={styles.tag} key={tag}>{tag}</p>
                    ))}
                </div> 
                <p className={styles.desc}>{post.descricao}</p>

                <div className={styles.list}>
                    <ul>
                        {post.itens_lista?.map((item) => (
                            <li key={item.nome_item}>{item.nome_item}</li>
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
            </div>
        </>
    )
}

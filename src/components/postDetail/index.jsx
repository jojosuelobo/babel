/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import styles from './postDetail.module.sass'
import profile from '../../../public/LogoUVV.png' // Afins de testes
import { Link } from 'react-router-dom'
import { useState } from 'react'

// icons
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

export default function index({ post }) {
    const [like, setLike] = useState(true)

    return (
        <div className={styles.post}>
            <div className={styles.header}>
                <div className={styles.header_text}>
                    <h2 className={styles.title}>{post.titulo}</h2>
                    <p className={styles.date}>{post.data_postagem}</p>
                </div>
                <AiOutlineHeart className={styles.icon} />
            </div>
            <div className={styles.tags}>
                {(post.tags_relacionadas)?.map((tag) => (
                    <p className={styles.tag} key={tag}>{tag}</p>
                ))}
            </div>

            <p className={styles.desc}>{post.descricao}</p>
            <div className={styles.post_footer}>
                <div className={styles.profile_info}>
                    <img className={styles.profile_pic} src={profile} alt="" />
                    <p className={styles.username}>{post.nome_usuario}</p>
                </div>
                <Link to={`/posts/${post.id}`} className={styles.post_btn}>Abrir</Link>
            </div>
        </div>
    )
}

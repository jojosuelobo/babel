import styles from './postDetail.module.sass'
import profile from '../../../public/LogoUVV.png' // Afins de testes
import { Link } from 'react-router-dom'

export default function index({ post }) {
    return (
        <div className={styles.post} key={post.data_postagem}>
            <h2 className={styles.title}>{post.titulo}</h2>
            <p className={styles.date}>{post.data_postagem}</p>

            <div className={styles.tags}>
                {(post.tags_relacionadas).map((tag) => (
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

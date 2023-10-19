/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import styles from './postDetail.module.sass'
import profile from '../../../public/LogoUVV.png' // Afins de testes
import backend from '../../axios/config'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// icons
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

export default function index({ post }) {
    const [like, setLike] = useState(true)
    const [userData, setUserData] = useState([])

    // TODO: mover este metodo para alguma classe reutilizavel
    const getUserData = async () => {
        try{
            const response = await backend.get(`/usuarios/id?IdUsuario=${post.idUsuario}`)
            const userData = response.data
            setUserData(userData)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        async function fetchData(){
            await getUserData()
        }
        fetchData()
    }, [])

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
                {(post.tags).map((tag) => (
                    <p className={styles.tag} key={tag}>{tag}</p>
                ))}
            </div>

            <p className={styles.desc}>{post.descricao}</p>
            <div className={styles.post_footer}>
                <div className={styles.profile_info}>
                    <img className={styles.profile_pic} src={profile} alt="" />
                    <p className={styles.username}>{userData.nome}</p>
                </div>
                <Link to={`/posts/${post.idLista}`} className={styles.post_btn}>Abrir</Link>
            </div>
        </div>
    )
}

/* eslint-disable no-unused-vars */
import styles from './Post.module.sass'
import profile from '../../../public/logoUVV.png'
// Icons
import { IoMdArrowRoundBack } from 'react-icons/io'
import { AiOutlineEdit } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import backend from '../../axios/config'
import blogFetch from '../../axios/config'
import { useFetch } from '../../hooks/useFetch'

import { showSuccessToast, showErrorToast } from '../../components/toast';

// Components
import Header from '../../components/header'
import Aside from '../../components/asideCustom'

import { useAuthentication } from '../../supabase/useAuth';

export default function Post() {
    const navigate = useNavigate()

    
    const { id } = useParams()
    const [post, setPost] = useState([])
    const [userData, setUserData] = useState([])
    const [userId, setUserId] = useState()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [sessionId, setSessionId] = useState()

    const auth = useAuthentication();
    const user = getUser().then(result => setSessionId(result));

    async function getUser()
    {
        const user = await auth.getUserId();
        
        return user
    }

    const openConfirmationModal = () => {
        setShowConfirmationModal(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
    };


    const getPosts = async () => {
        try {
            const response = await backend.get(`/posts/id?idLista=${id}`)
            const data = response.data

            const responseUser = await backend.get(`/usuarios/id?IdUsuario=${data.idUsuario}`)
            const userData = responseUser.data
            setUserData(userData)

            setUserId(data.idUsuario)

            setPost(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        async function fetchData(){
            await getPosts()
        }
        fetchData()
    }, [])

    const handleDelete = async () => {

        try {
            await backend.delete(`/delete/id?idLista=${id}`)
            navigate('/');
            showSuccessToast('Lista deletada com sucesso!');

        } catch (error) {
            console.log(error)
            showErrorToast('Falha ao excluir a lista. Por favor, tente novamente.')

        }
        closeConfirmationModal();
    }

    return (
        <>
            <Header />
            <div className={styles.section}>
                <Aside />
                <div className={styles.post}>
                    <div className={styles.icons}>
                        <Link to={'/'}> <IoMdArrowRoundBack className={styles.icon} /> </Link>

                        {sessionId === userId &&
                            <div>
                                <Link to={`/edit/${post.idLista}`}> <AiOutlineEdit className={styles.icon} /> </Link>
                                <a className={styles.icon} onClick={openConfirmationModal}>
                                    <TiDelete className={styles.icon} />
                                </a>
                            </div>
                        }

                    </div>
                    <h2 className={styles.title}>{post.titulo}</h2>
                    <p className={styles.date}>{post.dataCriacao}</p>

                    <div className={styles.tags}>
                        {post.tags?.map((tag, index) => (
                            <p className={styles.tag} key={index}>{tag}</p>
                        ))}
                    </div>
                    <p className={styles.desc}>{post.descricao}</p>

                    <div className={styles.list}>
                        <ul>
                            {post.conteudo?.map((item, index) => (
                                <li key={index}>
                                    <h1>{item.nomeItem}</h1>
                                    <p>{item.descricaoItem}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.post_footer}>
                        <div className={styles.profile_info}>
                            <img className={styles.profile_pic} src={profile} alt="" />
                            <p className={styles.username}>{userData.nome}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.coment}>

                </div>

                {showConfirmationModal && (
                    <div className={styles.confirmationModal}>
                        <div className={styles.confirmationBox}>
                            <p>Deseja realmente excluir esta postagem?</p>
                            <button onClick={handleDelete}>Sim</button>
                            <button onClick={closeConfirmationModal}>Cancelar</button>
                        </div>
                    </div>
                )}


            </div>
        </>
    )
}






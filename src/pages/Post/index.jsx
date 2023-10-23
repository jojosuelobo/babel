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
import blogFetch from '../../axios/config'
import { useFetch } from '../../hooks/useFetch'

import { showSuccessToast, showErrorToast } from '../../components/toast';

// Components
import Header from '../../components/header'
import Aside from '../../components/asideCustom'

// Firebase
import { getAuth } from "firebase/auth";

export default function Post() {
    const navigate = useNavigate()

    const url = 'http://localhost:3000/posts'
    const { httpConfig, loading } = useFetch(url)
    const { id } = useParams()

    const [post, setPost] = useState([])
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const openConfirmationModal = () => {
        setShowConfirmationModal(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
    };


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

    // Nome de usuário
    const auth = getAuth();
    const user = auth.currentUser;
    const displayName = user.displayName

    const handleDelete = async () => {

        try {
            await httpConfig(id, "DELETE");
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

                        {displayName === post.nome_usuario &&
                            <div>
                                <Link to={`/edit/${post.id}`}> <AiOutlineEdit className={styles.icon} /> </Link>
                                <a className={styles.icon} onClick={openConfirmationModal}>
                                    <TiDelete className={styles.icon} />
                                </a>
                            </div>
                        }

                    </div>
                    <h2 className={styles.title}>{post.titulo}</h2>
                    <p className={styles.date}> {post.data_postagem}</p>

                    <div className={styles.tags}>
                        {post.tags_relacionadas?.map((tag, index) => (
                            <p className={styles.tag} key={index}>{tag}</p>
                        ))}
                    </div>
                    <p className={styles.desc}>{post.descricao}</p>

                    <div className={styles.list}>
                        <ul>
                            {post.itens_lista?.map((item, index) => (
                                <li key={index}>
                                    <h1>{item.nome_item}</h1>
                                    <p>{item.descricao_item}</p>
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






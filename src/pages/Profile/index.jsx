/* eslint-disable no-unused-vars */
// Estilos
import styles from './Profile.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'
import PostDetail from '../../components/postDetail'

// Firebase
import { getAuth } from "firebase/auth";

// 
import blogFetch from '../../axios/config'
import { useState, useEffect } from 'react'
import profilePic from '../../../public/logoUVV.png'

export default function Profile() {
  const [posts, setPosts] = useState([])

  // Nome de usuário
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.displayName

  const getPosts = async () => {
    try {
      const response = await blogFetch.get(`/posts?nome_usuario=${displayName}`)
      const data = response.data
      setPosts(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  //tentando implementar o modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedPronoun, setEditedPronoun] = useState('');
  const [editedBio, setEditedBio] = useState('');

  const openModal = () => {
    setModalOpen(true);

    // Carregar os valores do localStorage ou valores padrão
    const savedEditedUsername = localStorage.getItem('editedUsername') || displayName;
    const savedEditedPronoun = localStorage.getItem('editedPronoun') || '';
    const savedEditedBio = localStorage.getItem('editedBio') || '';

    setEditedUsername(savedEditedUsername);
    setEditedPronoun(savedEditedPronoun);
    setEditedBio(savedEditedBio);
  };

  const closeModal = () => {
    setModalOpen(false);
  }

  const saveChanges = () => {
    localStorage.setItem('editedUsername', editedUsername);
    localStorage.setItem('editedPronoun', editedPronoun);
    localStorage.setItem('editedBio', editedBio);
    closeModal();
  }

  // Verifique se há valores no localStorage ao carregar a página
  useEffect(() => {
    const savedEditedUsername = localStorage.getItem('editedUsername');
    const savedEditedPronoun = localStorage.getItem('editedPronoun');
    const savedEditedBio = localStorage.getItem('editedBio');

    if (savedEditedUsername) {
      setEditedUsername(savedEditedUsername);
    }

    if (savedEditedPronoun) {
      setEditedPronoun(savedEditedPronoun);
    }

    if (savedEditedBio) {
      setEditedBio(savedEditedBio);
    }
  }, []);

  return (
    <>
      <Header />
      {/* Menu a esquerda dá página */}
      <Aside />
      <section className={styles.main}>
        {/* Conteúdo principal da página */}
        <div className={styles.perfil}>
          {/* Tenho que consertar o botão <button>Editar Perfil</button> */}

          <button onClick={openModal}>Editar Perfil</button>
          <div className={styles.container}>
            <div className={styles.avatar}>
              <img src={profilePic} alt="Avatar" />
            </div>
            <h2>{editedUsername}</h2>
            <p>{editedPronoun}</p>
          </div>
          <h3>Bio</h3>
          <p className={styles.bio}>{editedBio}</p>

          <h2 className={styles.title}>Listas</h2>
          <div className={styles.divider}></div>
          <div className={styles.feed}>
            {posts.length === 0 ? (
              <div>
                <h1>Não há posts a serem exibidos</h1>
              </div>
            ) : (
              posts.map((post) => <PostDetail key={post.id} post={post} />)
            )}
          </div>

        </div>

        {isModalOpen && (
          <div className={styles.modal_overlay}>
            <div className={styles.modal}>
              <h2>Editar Perfil</h2>
              <p>Nome do Usuário</p>
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
              <p>Pronomes</p>
              <input
                type="text"
                value={editedPronoun}
                onChange={(e) => setEditedPronoun(e.target.value)}
              />
              <p>Bio</p>
              <input
                type="text"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
              />
              <div className={styles.button_container}>
                <button onClick={saveChanges}>Salvar</button>
                <button onClick={closeModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

      </section>
    </>
  )
}

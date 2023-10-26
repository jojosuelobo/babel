/* eslint-disable no-unused-vars */
// Estilos
import styles from './Profile.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'
import PostDetail from '../../components/postDetail'

// Hooks
import { useParams } from 'react-router-dom'

// Firebase
import { getAuth } from "firebase/auth";
import blogFetch from '../../axios/config'
import { useState, useEffect } from 'react'
import profilePic from '../../../public/logoUVV.png'

// Supabase
import { useAuthentication } from '../../supabase/useAuth';

// Backend
import backend from '../../axios/config'


import { showInfoToast } from '../../components/toast';

export default function Profile() {
  const [posts, setPosts] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedPronoun, setEditedPronoun] = useState('');
  const [editedBio, setEditedBio] = useState('');
  const [sessionId, setSessionId] = useState()

  // Carregando informações do usuário
  // const auth = getAuth();
  // const user = auth.currentUser;
  // const uid = user.uid;
  // const displayName = user.displayName;
  const auth = useAuthentication();
  const user = getUser().then(result => setSessionId(result));
  const displayName = auth.getEmail();

  let actualDisplayName;

  displayName.then(function(result){
      actualDisplayName = result;
  })

  async function getUser()
  {
      const user = await auth.getUserId();
      
      return user
  }

  // Referente aos Posts
  const getPosts = async () => {
    try {
      console.log((await getUser()).slice(0,(await getUser()).length))
      //const response = await blogFetch.get(`/posts?nome_usuario=${displayName}`)
      const response = await backend.get(`/posts/usuario?idUsuario=${(await getUser()).slice(0,(await getUser()).length)}`)
      const data = response.data
      console.log(data)
      setPosts(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
    getPosts()
  }, [])


  // Referentes ao Modal
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  }

  const saveChanges = () => {
    localStorage.setItem(`editedUsername_${sessionId}`, editedUsername);
    localStorage.setItem(`editedPronoun_${sessionId}`, editedPronoun);
    localStorage.setItem(`editedBio_${sessionId}`, editedBio);
    closeModal();
    showInfoToast('As mudanças no perfil foram aplicadas.');
  }

  // Verifica se há valores no localStorage ao carregar a página
  useEffect(() => {
    const savedEditedUsername = localStorage.getItem(`editedUsername_${sessionId}`) || actualDisplayName;
    const savedEditedPronoun = localStorage.getItem(`editedPronoun_${sessionId}`) || '';
    const savedEditedBio = localStorage.getItem(`editedBio_${sessionId}`) || '';

    setEditedUsername(savedEditedUsername);
    setEditedPronoun(savedEditedPronoun);
    setEditedBio(savedEditedBio);

  }, [getUser(), actualDisplayName]);

  return (
    <>
      <Header />
      <section className={styles.main}>
        <Aside />
        <div className={styles.perfil}>
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
            {posts == undefined || posts.length === 0 ? (
              <div>
                <h1>Não há posts a serem exibidos</h1>
              </div>
            ) : (
              posts.map((post) => <PostDetail key={post.idLista} post={post} />)
            )}
          </div>

        </div>

        {/* Modal */}
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

/* eslint-disable no-unused-vars */
// Estilos
import styles from './Profile.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'
import PostDetail from '../../components/postDetail'

// Hooks
import { useParams } from 'react-router-dom'

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
  const [sessionId, setSessionId] = useState();

  //modificando o perfil
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [pronomes, setPronomes] = useState('');
  //
  const auth = useAuthentication();
  const user = getUser().then(result => {
    
    setSessionId(result);
    setUsername(result.username);
    setBio(result.bio);
    setPronomes(result.pronomes);
  }
  );
  const displayName = auth.getEmail();


  let actualDisplayName;

  displayName.then(function (result) {
    actualDisplayName = result;
  })

  async function getUser() {
    const user = await auth.getUserId();

    return user
  }

  // Referente aos Posts
  const getPosts = async () => {
    try {
      console.log((await getUser()).slice(0, (await getUser()).length))
      //const response = await blogFetch.get(`/posts?nome_usuario=${displayName}`)
      const response = await backend.get(`/posts/usuario?idUsuario=${(await getUser()).slice(0, (await getUser()).length)}`)
      const data = response.data
      console.log(data)
      setPosts(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser();
    getPosts();
  }, [sessionId])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatePerfil = {
        nome: username,
        descricao: bio,
        pronomes
      };

      await backend.put(`/usuarios/edit?idUsuario=${(await getUser()).slice(0, (await getUser()).length)}`, updatePerfil);
      closeModal();
      showInfoToast('As mudanças no perfil foram aplicadas');
    } catch (error) {
      console.error('Erro ao atualizar a data', error);
    }
  }


  // Referentes ao Modal
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  }


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
            <h2>{username}</h2>
            <p>{pronomes}</p>
          </div>
          <h3>Bio</h3>
          <p className={styles.bio}>{bio}</p>

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p>Pronomes</p>
              <input
                type="text"
                value={pronomes}
                onChange={(e) => setPronomes(e.target.value)}
              />
              <p>Bio</p>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <div className={styles.button_container}>
                <button onClick={handleSubmit}>Salvar</button>
                <button onClick={closeModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

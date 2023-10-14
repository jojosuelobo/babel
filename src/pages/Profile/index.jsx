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

  return (
    <>
      <Header />
      {/* Menu a esquerda dá página */}
      <Aside />
      <section className={styles.main}>
        {/* Conteúdo principal da página */}
        <div className={styles.perfil}>
          {/* Tenho que consertar o botão <button>Editar Perfil</button> */}

          <button>Editar Perfil</button>
          <div className={styles.container}>
            <div className={styles.avatar}>
              <img src={profilePic} alt="Avatar" />
            </div>
            <h2>Nome do Usuário</h2>
            <p>Ela/dela</p>
          </div>
          <h3>Bio</h3>
          <input></input>


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
      </section>
    </>
  )
}

/* eslint-disable no-unused-vars */
// Estilos
import styles from './Notifications.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'
import PostDetail from '../../components/postDetail'

// 
import blogFetch from '../../axios/config'
import { useState, useEffect } from 'react'

export default function Notifications() {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/posts")
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
      <section className={styles.main}>
        {/* Menu a esquerda dá página */}
        <Aside />
        {/* Conteúdo principal da página */}
        <div className={styles.feed}>
            <div className={styles.title}>
              <h1><h1>Notifications</h1></h1>
            </div> 
        </div>
        <div className={styles.title_notification}>
            <div className={styles.feed}>
              Perfil, <h4>Nome perfil</h4>, publicou uma nova lista! 
            </div> 
        </div>
        <div className={styles.title_notification}>
            <div className={styles.feed}>
              <h4>Nome perfil</h4>, começou a seguir você
            </div> 
        </div>
        <div className={styles.title_notification}>
            <div className={styles.feed}>
              <h4>Nome perfil</h4>, deixou de seguir você
            </div> 
        </div>
        <div className={styles.title_notification}>
            <div className={styles.feed}>
              Perfil, <h4>Nome perfil</h4>, publicou uma nova lista!
            </div> 
        </div>
        <div className={styles.title_notification}>
            <div className={styles.feed}>
              <h4>Nome perfil</h4>, começou a seguir você
            </div> 
        </div>
      </section>
    </>
  )
}
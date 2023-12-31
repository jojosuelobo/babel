/* eslint-disable no-unused-vars */
// Estilos
import styles from './Feed.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'
import PostDetail from '../../components/postDetail'

// 
import backend from '../../axios/config'
import { useState, useEffect } from 'react'

export default function Feed() {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const response = await backend.get("/posts")
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
          {posts.length === 0 ? (
            <div className={styles.error}>
              <h1>Não há posts a serem exibidos</h1>
            </div>
          ) : (
            posts.map((post) => <PostDetail key={post.idLista} post={post} />)
          )}
        </div>
      </section>
    </>
  )
}

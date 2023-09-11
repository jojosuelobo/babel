// Estilos
import styles from './Feed.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'

// 
import blogFetch from '../../axios/config'
import { useState, useEffect } from 'react'

export default function Feed() {
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
        {posts.length === 0 ? (<p>Carregando...</p>) : (
          posts.map((post) => (
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
                <img className={styles.profile_pic} src="" alt="" />
                <p className={styles.username}>{post.nome_usuario}</p>
                <button>Abrir</button>
              </div>
            </div>
          ))
        )}


      </section>
    </>
  )
}

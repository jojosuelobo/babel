// Estilos
import styles from './Feed.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'
import PostDetail from '../../components/postDetail'

// 
import blogFetch from '../../axios/config'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Feed() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("");
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

  const handleSearch = async () => {
    if(query.trim() === '')
      return
    return navigate(`/search?q=${query.trim()}`)
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

        <div className={styles.search_container}>
          <input
            type="text"
            placeholder="Buscar"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>

        {/* Conteúdo principal da página */}
        <div className={styles.feed}>
          {posts.length === 0 ? (
            <div>
              <h1>Não há posts a serem exibidos</h1>
            </div>
          ) : (
            posts.map((post) => <PostDetail key={post.id} post={post} />)
          )}
        </div>
      </section>
    </>
  )
}

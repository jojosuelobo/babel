import { useState, useEffect } from 'react'
import styles from './Search.module.sass'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { Link } from 'react-router-dom'

// Component
import Header from '../../components/header'
import PostDetail from '../../components/postDetail'

// Hooks
import backend from '../../axios/config'
import { useQuery } from '../../firebase/useQuery'

export default function Search() {
    const query = useQuery()
    const search = query.get("q")

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        try {
            const response = await backend.get(`/posts`)
            const data = response.data
            const filteredData = data.filter(post => post.tags.includes(`${search}`))
            setPosts(filteredData)
            console.log(filteredData)
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
            <div className={styles.result}>
                <Link to={'/'}> <IoMdArrowRoundBack className={styles.icon} /> </Link>
                <h1>Resultados de busca por: {search}</h1>
            </div>
            <div className={styles.feed}>
                {posts.length === 0 ? (
                    <div>
                        <h1>Não há posts a serem exibidos</h1>
                    </div>
                ) : (
                    posts.map((post) => <PostDetail key={post.idLista} post={post} />)
                )}
            </div>

        </>
    )
}

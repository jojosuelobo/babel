import styles from './AsideCustom.module.sass'

export default function aside() {
  return (
    <aside className={styles.main_content}>
      <ul>
        <li>
          <h1>home</h1>
        </li>
        <li>
          <h1>feed</h1>
        </li>
        <li>
          <h1>etc</h1>
        </li>
      </ul>
    </aside>
  )
}

/* eslint-disable no-unused-vars */
import styles from './AboutUs.module.sass'

// Components
import Header from '../../components/header'

// Img
import Image from '../../../public/logo.png'
import User from '../../../public/user.png'

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className={styles.mainContent}>
        <h1>Quem somos</h1>
        <div className={styles.info}>
          <h1>Babel</h1>
          <img className={styles.logo} src={Image} alt="logo" />
          <h3>
            A simplicidade de criar listas se une à riqueza das histórias compartilhadas. Acreditamos que as listas são mais do que meros rascunhos de papel; elas são reflexos das nossas vidas, dos nossos desejos, das nossas paixões e dos nossos sonhos. Elas são uma manifestação de nossa singularidade e da maneira como vemos o mundo.
          </h3>

          <h1>Nosso Time</h1>
          <div className={styles.time}>
            <ul>

              <li>
                <img className={styles.user} src={User}/>
                <p>Josué Lobo</p>
                <p>Desenvolvedor Front End</p>
              </li>

              <li>
                <img className={styles.user} src={User}/>
                <p>Caio Schmithd</p>
                <p>Desenvolvedor Front End</p>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

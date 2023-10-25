/* eslint-disable no-unused-vars */
import styles from './AboutUs.module.sass'

// Components
import Header from '../../components/header'

// Img
import Image from '../../../public/logo.png'
import Img1 from '../../../public/img1.png'

import Josue from '../../../public/time/profile.jpg'
import Carlos from '../../../public/time/carloss.jpg'
import Gabriel from '../../../public/time/gabriel.png'
import Mateus from '../../../public/time/mateus.png'
import Matheus from '../../../public/time/matheus.png'
import Roberta from '../../../public/time/roberta.png'
import Caio from '../../../public/time/schmitdh.png'
import Marcos from '../../../public/time/marcos.jpg'

// Icons
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube } from 'react-icons/ai'


export default function AboutUs() {

  const handleClick = () => {
    const youtubeVideoURL = 'https://youtu.be/dQw4w9WgXcQ?si=0npy_2Hvj7wX3p8h';

    // Abra o vídeo do YouTube em uma nova janela do navegador
    window.open(youtubeVideoURL, '_blank');
  }

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

          <h1>Nossa Missão</h1>
          <div className={styles.infos}>
            <img src={Img1} />
            <h3>Nós da Babel, assim como a biblioteca de Babel, temos como valor principal prover um espaço infinito de possibilidades para a expressão humana. Na Babel, buscamos canalizar essa mesma diversidade e criatividade através de nossa plataforma de listas. Nossa missão é oferecer a todos a oportunidade de compartilhar, explorar e celebrar a singularidade de suas experiências, paixões e saberes por meio de listas personalizadas.</h3>
          </div>

          <div className={styles.time}>
            <h1>Nosso Time</h1>

            <ul>

              <li>
                <img className={styles.user} src={Josue} />
                <p>Josué Lobo</p>
                <p>Desenvolvedor Front End</p>
              </li>

              <li>
                <img className={styles.user} src={Caio} />
                <p>Caio Schmidt</p>
                <p>Desenvolvedor Back End</p>
              </li>

              <li>
                <img className={styles.user} src={Gabriel} />
                <p>Gabriel Lemos</p>
                <p>UX Designer</p>
              </li>

              <li>
                <img className={styles.user} src={Carlos} />
                <p>Carlos Pitanga</p>
                <p>UX Designer</p>
              </li>

              <li>
                <img className={styles.user} src={Mateus} />
                <p>Mateus Dal Cim</p>
                <p>Desenvolvedor Back End</p>
              </li>

              <li>
                <img className={styles.user} src={Roberta} />
                <p>Roberta Meirellys</p>
                <p>Desenvolvedor Front End</p>
              </li>

              <li>
                <img className={styles.user} src={Marcos} />
                <p>Marcos Tirelo</p>
                <p>Desenvolvedor Back End</p>
              </li>

              <li>
                <img className={styles.user} src={Matheus} />
                <p>Matheus de Carvalho</p>
                <p>Desenvolvedor Front End</p>
              </li>
            </ul>
          </div>
        </div>
        <footer>
          <h1>Contatos</h1>
          <div className={styles.media}>
            <AiOutlineInstagram onClick={handleClick} className={styles.icon} />
            <AiOutlineTwitter onClick={handleClick} className={styles.icon} />
            <AiOutlineYoutube onClick={handleClick} className={styles.icon} />
          </div>
        </footer>
      </div>
    </>
  )
}

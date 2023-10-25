/* eslint-disable no-unused-vars */
import styles from './Settings.module.sass'

// Componentes 
import Aside from '../../components/asideCustom'
import Header from '../../components/header'

import { SelectButton } from 'primereact/selectbutton';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Button } from 'primereact/button';

// Router
import { Link, useNavigate } from 'react-router-dom'

// Hooks
import { useState } from 'react';

export default function Settings() {
  const navigate = useNavigate()

  const options = ['Ativar', 'Desativar'];

  const [inputs, setInputs] = useState({
    SMS: options[0],
    Email: options[0],
    TwoSteps: options[0],
  })

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'Português', code: 'PT-BT' },
    { name: 'Inglês', code: 'EN' },
    { name: 'Espanhol', code: 'ES' },
  ];

  const handleSubmit = () => {
    navigate('/')
  }

  return (
    <>
      <Header />
      <Aside />
      <div className={styles.main}>
        <div className={styles.settings}>
          <h1>Configurações</h1>
          <div className={styles.options}>
            <ul className={styles.list}>
              <li>
                <div className={styles.desc}>
                  <h2>Notificações por SMS</h2>
                  <p>Receba notificação e alertas via SMS</p>
                </div>
                <div className={styles.button}>
                  <SelectButton name='SMS' value={inputs.SMS} onChange={handleInputChange} options={options} className={styles.OnOff} />
                </div>
              </li>
              <li>
                <div className={styles.desc}>
                  <h2>Notificações por E-mail</h2>
                  <p>Receba notificação e alertas via E-mail</p>
                </div>
                <div className={styles.button}>
                  <SelectButton name='Email' value={inputs.Email} onChange={handleInputChange} options={options} className={styles.OnOff} />
                </div>
              </li>
              <li>
                <div className={styles.desc}>
                  <h2>Verificação em duas etapas</h2>
                  <p>Com a verificação em duas etapas, também chamada de autenticação de dois fatores, você pode adicionar uma camada a mais de segurança à sua conta</p>
                </div>
                <div className={styles.button}>
                  <SelectButton name='TwoSteps' value={inputs.TwoSteps} onChange={handleInputChange} options={options} className={styles.OnOff} />
                </div>
              </li>
            </ul>
            <ul className={styles.list}>
              <li>
                <div className={styles.desc}>
                  {/* <h2>Idioma</h2>
                  <select>
                    <option>Português</option>
                    <option >Inglês</option>
                    <option>Espanhol</option>
                  </select> */}
                  <h2>Idioma</h2>
                  <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                    placeholder="Selecione um idioma" className={styles.dropdown} />
                </div>
              </li>
              <li>
                <button className={styles.submit} onClick={handleSubmit}>Salvar</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

import React, { useState } from 'react';


import InputMask from 'react-input-mask';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/data.png';

import api from '../../services/api';

import './styles.css';


export default function Register() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [github_username, setGithub_username] = useState('')
    const [cep, setCep] = useState('')

    const history = useHistory();


    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            github_username,
            cep,
        }

        try {
            const response = await api.post('devs', data)
            alert(`seu ID de acesso: ${response.data.id}`)

            history.push('/')
        }catch(err){
            alert('Erro no cadastro. Tente novamente')
        }
     
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro com o seu Username do github e faça
                        parte da plataforma.
                    </p>
                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color='#e02041' />
                        Já tenho Cadastro</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder='Nome do Dev'
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputMask
                        type='text'
                        mask='+55 (99)99999-9999'
                        placeholder='WhatsApp'
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Github Username'
                        value={github_username}
                        onChange={e => setGithub_username(e.target.value)}
                    />
                    <InputMask
                        type='text'
                        mask='99999-999'
                        placeholder='Cep'
                        value={cep}
                        onChange={e => setCep(e.target.value)}
                    />

                    <button className='button'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
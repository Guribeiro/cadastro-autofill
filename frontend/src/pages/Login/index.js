import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import devsImg from '../../assets/heroes.png';
import logoImg from '../../assets/data.png';

import api from '../../services/api';

export default function Login() {

    const [github_username, setGithub_username] = useState('');
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            github_username,
            id
        }

        try {
            const response = await api.post('sessions', data)

            const devData = await api.get(`https://api.github.com/users/${github_username}`)

            const { avatar_url, html_url, bio } = devData.data;


            const nome = response.data.nome;

            localStorage.setItem('github_username', github_username)
            localStorage.setItem('devId', id)
            localStorage.setItem('devNome', nome)
            localStorage.setItem('avatar_url', avatar_url)
            localStorage.setItem('html_url', html_url)
            localStorage.setItem('bio', bio)

            history.push('/profile')
        } catch (err) {
            alert('Falha no login')
        }
    }
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="logo" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input
                        type="text"
                        placeholder='Github Username'
                        value={github_username}
                        onChange={e => setGithub_username(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Seu ID'
                        value={id}
                        onChange={e => setId(e.target.value)}

                    />

                    <button className='button' type='submit'>Entrar</button>

                    <Link className='back-link' to="/register">
                        <FiLogIn size={16} color='#e02041' />
                        Não tenho cadastro</Link>
                </form>
            </section>
            <img src={devsImg} alt="devs" />
        </div>
    );
}
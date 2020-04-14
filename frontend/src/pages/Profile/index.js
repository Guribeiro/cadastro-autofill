import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiGithub, FiSettings } from 'react-icons/fi';
//import '../../global.css';

import api from '../../services/api';


import './styles.css';

export default function Profile() {

    const [casos, setCasos] = useState([])
    const devId = localStorage.getItem('devId');
    const devNome = localStorage.getItem('devNome');
    const github_username = localStorage.getItem('github_username');
    const avatar_url = localStorage.getItem('avatar_url');
    const html_url = localStorage.getItem('html_url');
    const bio = localStorage.getItem('bio');

    const history = useHistory()

    useEffect(() => {
        api.get('profiles', {
            headers: {
                Authorization: devId,
            }
        }).then(response => {
            setCasos(response.data);
        })
    }, [devId]);


    async function handleDeleteCaso(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    Authorization: devId,
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));
        }
        catch (err) {

        }
    }


    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <div className="div-profile">
                    <div className="name-img">
                        <img src={avatar_url} alt="logo" />
                        <div className="container-git">
                            <span>Bem vindo, {devNome}</span>
                            <a href={html_url}>
                                {github_username}
                                <FiGithub />
                            </a>
                            <p>{bio}</p>
                        </div>
                    </div>
                    <Link className='link-settings' to='/settings'>
                        <FiSettings/>
                    </Link>
                </div>

                <Link className='button' to='/casos/new'>Cadastar um novo caso</Link>
                <button onClick={handleLogout} type='button'>
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                        <strong>Caso</strong>
                        <p>{caso.title}</p>

                        <strong>Descrição</strong>
                        <p>{caso.description}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(caso.value)}</p>

                        <button onClick={() => handleDeleteCaso(caso.id)}>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
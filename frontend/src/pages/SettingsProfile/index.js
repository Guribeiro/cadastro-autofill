import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';


export default function SettingsProfile() {

    const [dev, setDev] = useState('');
    const devId = localStorage.getItem('devId');

    const history = useHistory();

    useEffect(() => {
        api.get('settings', {
            headers: {
                Authorization: devId,
            }
        }).then(response => {
            setDev(response.data);
        })
    }, [devId])


    async function handleDeleteDev(id) {

        try {
            await api.delete(`settings/${id}`, {
                headers: {
                    Authorization: devId
                }
            });

            setDev(dev.filter(dev => dev.id !== id))
            localStorage.clear();
            history.push('/')
            console.log(dev)

        } catch (err) {
            alert('erro')
            console.log(dev)
        }

    }


    return (


        <div className="profile">
            <Link className='link-back' to="/profile">
                <FiArrowLeft size={16} color='#e02041' />
                        Voltar
            </Link>


            <div key={dev.id} className="block">

                <div  className="container-content">
                    <section className="github-infos">
                        <figure>
                            <img src={dev.avatar_url} alt="github-user" />
                        </figure>
                        <div className="infos">
                            <strong>Username</strong>
                            <p>{dev.github_username}</p>
                            <strong>Bio</strong>
                            <p>{dev.bio}</p>
                        </div>
                    </section>
                    <div className="personal-infos">
                        <div className="infos">

                            <strong>Nome</strong>
                            <p>{dev.nome}</p>

                            <strong>Email</strong>
                            <p>{dev.email}</p>

                            <strong>WhatsApp</strong>
                            <p>{dev.whatsapp}</p>

                        </div>
                        <div className="bar">
                            <div className="bar2"></div>
                        </div>

                        <div className="infos">

                            <strong>Cep</strong>
                            <p>{dev.cep}</p>

                            <strong>Logradouro</strong>
                            <p>{dev.logradouro}</p>

                            <strong>Bairro</strong>
                            <p>{dev.bairro}</p>

                            <strong>Localidade</strong>
                            <p>{dev.localidade}</p>

                            <strong>Uf</strong>
                            <p>{dev.uf}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => handleDeleteDev(dev.id)} className='button'>Excluir conta</button>
        </div>
    );
}
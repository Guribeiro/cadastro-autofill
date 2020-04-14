import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/data.png';

import api from '../../services/api';



import './styles.css'

export default function NovoCaso() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const devId = localStorage.getItem('devId');

    const history = useHistory()

    async function handleNovoCaso(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }
        
        try{
            await api.post('casos', data, {
                headers:{
                    Authorization: devId,
                }
            });

            history.push('/profile')
        }catch(err){
            alert('Não foi possível concluír o cadastro');
        }
        
    }

    return (
        <div className="novoCaso-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />
                    <h1>Cadastrar um novo caso</h1>
                    <p>
                        Nos diga mais sobre esse seu caso
                    </p>
                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color='#e02041' />
                        Voltar para Home</Link>
                </section>
                <form onSubmit={handleNovoCaso}>
                    <input
                        type="text"
                        placeholder='Título do caso'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        type="text"
                        placeholder='Descrição'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Valor em reais'
                        value={value}
                        onChange={e => (setValue(e.target.value))}
                    />


                    <button className='button'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
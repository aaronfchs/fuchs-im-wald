import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import Header from './components/Header';
import './Finished.css';
import './components/ButtonArea.css'


function Finished() {
    const navigate = useNavigate();
    const location = useLocation();
    const parameter = new URLSearchParams(location.search);
    const player1 = Number(parameter.get('player1'));
    const player2 = Number(parameter.get('player2'));
    const winner = parameter.get('winner');

    const formatResult = () => {
        if (winner == 'Aaron') {
            return (<h1 className='finish-main-content-score'>({player1} : {player2})</h1>)
        } else {
            return (<h1 className='finish-main-content-score'>({player2} : {player1})</h1>)
        }
    }



    return (
        <div className='page'>
            <Header />
            <main>
                <div className='finish-main-content'>
                    <h1 className='finish-main-content-winner'>{winner}</h1>
                    <h1>hat</h1>
                    <h1>gewonnen!</h1>
                    {formatResult()}
                </div>
                <div className='button-area'>
                    <button className='button-area-top' onClick={() => { navigate('/') }}>Startseite</button>
                    <button className='button-area-bottom' onClick={() => { navigate('/analytics') }}>Statistik</button>
                </div>
            </main>
        </div>
    )
}

export default Finished
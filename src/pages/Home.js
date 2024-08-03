import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebaseConfig';
import { getDocs, collection, doc, deleteDoc, where, query } from 'firebase/firestore';

import './Home.css'
import './Page.css'
import './components/ButtonArea.css'

import Header from './components/Header';

function Home() {
    const navigate = useNavigate();
    const [startedGame, setStartedGame] = useState();

    useEffect(() => {
        setStartedGame()
        getStartedGame()
    }, [])

    const getStartedGame = async () => {
        try {
            const query = await getDocs(collection(database, 'startedGames'));
            if (!query.empty) {
                setStartedGame(query.docs[0])
            }
        } catch (error) {
            console.error("Error fetching games: ", error);
        }
    }

    const comebackToGame = () => {
        // navigate to page and pass object
        navigate(`/game?game=${JSON.stringify(startedGame.data().rounds)}`)

        // delete game in database 'startedGame'
        deleteStartedGame();
    }

    const deleteStartedGame = async () => {
        await deleteDoc(doc(database, "startedGames", startedGame.id));
    }

    return (
        <div className='page'>
            <Header />
            <main>
                <div className='home-main-content'>
                    <div className='home-main-content-slogan'>
                        <h1>Aaron</h1>
                        <h1>:</h1>
                        <h1>Lina</h1>
                    </div>
                    {
                        startedGame &&
                        <div className='home-main-content-combackGame' onClick={comebackToGame}>
                            <p>{startedGame.data().date}, {startedGame.data().time}</p>
                            <h1 className='home-main-content-combackGame-standing'>{startedGame.data().points_Aaron} : {startedGame.data().points_Lina}</h1>
                            <h3 className='home-main-content-combackGame-standing'>fortsetzen &#10132;</h3>
                        </div>
                    }
                </div>
                <div className='button-area'>
                    <button className='button-area-top' onClick={() => { navigate('/game') }}>Start</button>
                    <button className='button-area-bottom' onClick={() => { navigate('/analytics') }}>Statistik</button>
                </div>
            </main >
        </div >
    )
}

export default Home;
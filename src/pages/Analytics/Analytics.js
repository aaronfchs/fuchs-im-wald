import React from 'react'
import { useEffect, useState } from 'react'

import Header from '../components/Header'

import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore'
import { database } from '../../firebaseConfig'

import { useNavigate } from 'react-router-dom'

import './Analytics.css'
import '../components/ButtonArea.css'

function Analytics() {
    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [maxDif, setMaxDif] = useState({})

    useEffect(() => {
        setGames([])
        getGames()
        getHighestDif()
    }, [])

    const getGames = async () => {
        try {
            let array = [];
            const query = await getDocs(collection(database, 'games'));
            query.docs.map(game => {
                array.push(game.data())
            })
            setGames(array)
        } catch (error) {
            console.error("Error fetching games: ", error);
        }
    }


    const getNumberOfWins = (player) => {
        let wins = 0;
        games.forEach(game => {
            if (game.winner == player) {
                wins++
            }
        })
        return wins
    }
    console.log(maxDif)

    const getHighestDif = async () => {
        try {
            setMaxDif(
                (await getDocs(query(collection(database, 'games'), orderBy("point_dif", "desc"), limit(1))))
                    .docs[0]
                    .data()
            )
        } catch (error) {
            console.error("Error fetching the game with highest pointDif: ", error);
            return null;
        }
    }

    return (
        <div className='page'>
            <Header />
            <main>
                <div className='statistics-main'>
                    <h2 className='statistics-main-subtitle'>Siege pro Person</h2>
                    <h2>Aaron: {getNumberOfWins('Aaron')}</h2>
                    <h2>Lina: {getNumberOfWins('Lina')}</h2>

                    <h2 className='statistics-main-subtitle'>größte Punktedifferenz</h2>
                    {maxDif &&
                        <div className='game'>
                            <div className='game-result'>
                                <h3 className='game-result-aaron'>(Aaron) {maxDif.points_Aaron} </h3>
                                <h3> : </h3>
                                <h3 className='game-result-lina'> {maxDif.points_Lina} (Lina)</h3>
                            </div>
                            <p>{maxDif.date}, {maxDif.time}</p>
                        </div>
                    }


                    <h2 className='statistics-main-subtitle'>bisherige Spiele</h2>
                    {
                        games.map((game, index) => {
                            return (
                                <div key={index} className='game'>
                                    <div className='game-result'>
                                        <h3 className='game-result-aaron'>(Aaron) {game.points_Aaron} </h3>
                                        <h3> : </h3>
                                        <h3 className='game-result-lina'> {game.points_Lina} (Lina)</h3>
                                    </div>
                                    <p>{game.date}, {game.time}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='button-area'>
                    <button className='button-area-top' onClick={() => { navigate('/') }}>Startseite</button>
                </div>
            </main>
        </div>
    )
}

export default Analytics
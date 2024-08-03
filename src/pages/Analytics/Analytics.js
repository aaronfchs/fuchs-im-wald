import React from 'react'
import { useEffect, useState } from 'react'

import Header from '../components/Header'

import { collection, getDocs } from 'firebase/firestore'
import { database } from '../../firebaseConfig'

import { useNavigate } from 'react-router-dom'

import './Analytics.css'
import '../components/ButtonArea.css'

function Analytics() {
    const navigate = useNavigate();

    const [games, setGames] = useState([]);

    useEffect(() => {
        setGames([])
        getGames()
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

    // {
    //     "time": "15:10",
    //     "point_dif": 8,
    //     "date": "31.07.2024",
    //     "rounds": [
    //         {
    //             "player1": 4,
    //             "round": 0,
    //             "player2": 0
    //         },
    //         {
    //             "round": 1,
    //             "player2": 8,
    //             "player1": 5
    //         },
    //         {
    //             "player2": 9,
    //             "round": 2,
    //             "player1": 3
    //         },
    //         {
    //             "player1": 3,
    //             "player2": 6,
    //             "round": 3
    //         }
    //     ],
    //     "points_Lina": 23,
    //     "winner": "Lina",
    //     "points_Aaron": 15
    // }

    return (
        <div className='page'>
            <Header />
            <main>
                <div className='statistics-main'>
                    <h2 className='statistics-main-subtitle'>Siege pro Person</h2>
                    <h2>Aaron: </h2>
                    <h2>Lina: </h2>

                    <h2 className='statistics-main-subtitle'>größte Punktedifferenz</h2>

                    <h2 className='statistics-main-subtitle'>bisherige Spiele</h2>
                    {
                        games.map((game, index) => {
                            console.log(game)
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
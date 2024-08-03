import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import Header from './components/Header';
import './Game.css'
import './components/ButtonArea.css'

import { database } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';


function Game() {
    const navigate = useNavigate();
    const location = useLocation();
    const parameter = new URLSearchParams(location.search);
    const startedGame = parameter.get('game');
    const now = new Date();

    const [player1RoundResult, setPlayer1RoundResult] = useState(0);
    const [player2RoundResult, setPlayer2RoundResult] = useState(0);
    const [results, setResults] = useState([]);

    // check if game is passed to continue
    useEffect(() => {
        if (startedGame) {
            setResults(JSON.parse(startedGame));
        }
    }, [startedGame]);

    const handleInput = (event) => {
        event.target.name == 'player1' ?
            setPlayer1RoundResult(event.target.value) :
            setPlayer2RoundResult(event.target.value);
    }

    const saveRound = () => {
        if ((Number(player1RoundResult) > 0) || ((Number(player2RoundResult) > 0))) {
            const curRound = {
                round: results.length,
                player1: Number(player1RoundResult),
                player2: Number(player2RoundResult)
            }
            results.push(curRound)

            // clear input fields
            setPlayer1RoundResult(0)
            setPlayer2RoundResult(0)

            // game finished?
            gameFinished()
        }
    }

    const gameFinished = () => {
        // get cur sum of each player
        let sumPlayer1 = getSumOfPlayer('player1')
        let sumPlayer2 = getSumOfPlayer('player2')

        const winner = getWinner(sumPlayer1, sumPlayer2);

        // finished?
        if ((sumPlayer1 >= 21) || (sumPlayer2 >= 21)) {
            // create game-object
            const game = {
                date: now.toLocaleString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                time: now.toLocaleString('de-DE', { hour: '2-digit', minute: '2-digit' }),
                rounds: results,
                winner: winner,
                points_Aaron: sumPlayer1,
                points_Lina: sumPlayer2,
                point_dif: Math.abs(sumPlayer1 - sumPlayer2)
            }
            // save object in db
            saveGame(game, 'games');

            // navigate to next page
            navigate(`/finished?player1=${sumPlayer1}&player2=${sumPlayer2}&winner=${winner}`);
        }
    }

    const saveGame = async (game, table) => {
        try {
            await addDoc(collection(database, table), game);
        } catch (error) {
            console.error("Error while saving game: ", error);
        }
    }

    const getWinner = (player1, player2) => {
        if (player1 > player2) {
            return 'Aaron'
        } else {
            return 'Lina'
        }
    }

    const getSumOfPlayer = (player) => {
        let sum = 0;
        results.forEach(round => { sum += round[player]; })
        return sum;
    }

    const saveCurStanding = () => {
        // roundResult saved? If not -> save
        if (player1RoundResult != 0 || player2RoundResult != 0) {
            saveRound();
        }

        // get cur sum of each player
        let sumPlayer1 = getSumOfPlayer('player1')
        let sumPlayer2 = getSumOfPlayer('player2')

        // create game-object
        const game = {
            date: now.toLocaleString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' }),
            time: now.toLocaleString('de-DE', { hour: '2-digit', minute: '2-digit' }),
            rounds: results,
            leader: getWinner(sumPlayer1, sumPlayer2),
            points_Aaron: sumPlayer1,
            points_Lina: sumPlayer2,
            point_dif: Math.abs(sumPlayer1 - sumPlayer2)
        }

        // save object in db, only when games has started
        if (game.points_Aaron != 0 || game.points_Lina != 0) {
            saveGame(game, 'startedGames');
        }
        navigate('/')
    }

    return (
        <div className='page'>
            <Header />
            <main>
                <div className='game-main-table'>
                    {results.length > 0 &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Runde</th>
                                    <th>Aaron</th>
                                    <th>Lina</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((round, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{round.round + 1}</td>
                                            <td>{round.player1}</td>
                                            <td>{round.player2}</td>
                                        </tr>
                                    )
                                })}
                                <tr className='game-main-table-curResult'>
                                    <td>=</td>
                                    <td>{getSumOfPlayer('player1')}</td>
                                    <td>{getSumOfPlayer('player2')}</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                    <div className='game-main-input'>
                        <h2>Rundenergebnis</h2>
                        <div className='game-main-input-player'>
                            Aaron:
                            <select onChange={handleInput} id="number-picker" value={player1RoundResult} name='player1'>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                                    <option key={number} value={number}>{number}</option>
                                ))}
                            </select>
                        </div>
                        <div className='game-main-input-player'>
                            Lina:
                            <select onChange={handleInput} id="number-picker" value={player2RoundResult} name='player2'>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                                    <option key={number} value={number}>{number}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='button-area'>
                    <button className='button-area-top' onClick={saveRound}>Speichern</button>
                    <button className='button-area-bottom' onClick={saveCurStanding}>Spiel unterbrechen</button>
                </div>
            </main >
        </div>
    )
}

export default Game
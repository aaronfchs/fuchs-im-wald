import React from 'react'

import './Header.css';
import Logo from '../../fuchs.png';


function Header() {
    return (
        <header className='home-header'>
            <div className='home-header-logo'>
                <img src={Logo} />
            </div>
            <div className='home-header-title'>
                <h1 className='home-header-title-part1'>Fuchs </h1>
                <h2 className='home-header-title-part2'>im Wald</h2>
            </div>
        </header>
    )
}

export default Header
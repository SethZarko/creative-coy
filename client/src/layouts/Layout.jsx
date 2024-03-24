import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

import Logo from '../assets/coyote.png'


export const Layout = () => {
    const [toggleNavMenu, setToggleNavMenu] = useState(false)

    const handleToggleNavMenu = () => {
        setToggleNavMenu(prev => !prev)
    }

    return (
        <>
            <header>
                <nav>
                    <div className="logo-container">
                        <img className='logo-img' src={Logo} alt="coyote-logo-image" />
                    </div>
                    {!toggleNavMenu && <i className="fa-solid fa-bars" onClick={handleToggleNavMenu}></i>}
                    {toggleNavMenu && <i className="fa-solid fa-x" onClick={handleToggleNavMenu}></i>}
                    {toggleNavMenu && <ul className='nav-menu'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About Us</Link></li>
                        <li><Link to='/packages'>Packages</Link></li>
                        <li><Link to='/services'>Services</Link></li>
                        <li><Link to='/events'>Event Categories</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>}
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </>
        
    )
}
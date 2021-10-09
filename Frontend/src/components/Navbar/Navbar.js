import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router'
import './Navbar.css'


function Navbar({ showIcon = true }) {
    const [show,handleShow] = useState(false)
    const history = useHistory()

    const transitionFunction = () => {
        if(window.scrollY>70)
            handleShow(true)
        else    
            handleShow(false)
    }

    useEffect(() => {
        window.addEventListener('scroll',transitionFunction)
        return () => {
            window.removeEventListener('scroll',transitionFunction)
        }
    }, [])
    return (
        //show black bar only when scroll is below 80
        <div className= {`navb ${show && 'nav_bg'} `}>
            <div className='nav_contents'>
                <img
                className = 'nav_logo'
                onClick = {() => history.push('/')}
                src='https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png'
                alt='logo'
                />
                { showIcon && <img
                onClick = {() => history.push('/profile')}
                className = 'nav_avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt='avatar'
                />}
            </div>
        </div>
    )
}

export default Navbar

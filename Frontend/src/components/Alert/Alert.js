import React from 'react'
import './Alert.css'

function Alert({msg}) {
    return (
        <div className='alert'>
            <p>{msg}</p>
        </div>
    )
}

export default Alert

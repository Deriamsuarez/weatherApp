import React from 'react'
import '../utils/styles/loader.css'

const loader = () => {
    return (
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}

export default loader
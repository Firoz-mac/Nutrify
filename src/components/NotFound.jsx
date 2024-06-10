import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (

        <section className='container nf'>

            <div className='not-found'>
                <h2>404 | Page Not Found</h2>
                <p><Link to={'/register'}>Register</Link> Now to Use</p>
            </div>

        </section>

    )
}

export default NotFound

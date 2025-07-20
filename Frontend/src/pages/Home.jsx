import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-full bg-cover bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] pt-8 h-screen bg-red-400 flex flex-col justify-between'>
         <div>
            <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt='Uber logo'/>
         </div>

        <div className='pb-7 bg-white py-4 px-5 flex flex-col items-center'>
            <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
            <Link to='/user-login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>

    </div>
  )
}

export default Home
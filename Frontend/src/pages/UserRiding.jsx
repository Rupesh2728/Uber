import React from 'react'
import { Link } from 'react-router-dom'

const UserRiding = () => {
  return (
   <div className='h-screen'>
    
    <Link to='/user-home' className='fixed right-2 top-4 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-3-line"></i>
    </Link>
    
    <div className='h-1/2'>
         <img
          alt="maps image"
          className="h-full w-full object-cover"
          src="https://i.pinimg.com/736x/d2/1b/e0/d21be0368da4fcfa395092c0ad839fbc.jpg"
        />
    </div>

    <div className='h-1/2 p-4 pt-6'>
      <div className='flex items-center justify-between'>
         <img
          alt="img"
          className="h-[4rem]"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
        />

        <div className='text-right'>
          <h2 className='text-lg font-medium'>Rupesh</h2>
          <h4 className='text-xl font-semibold'>MP04 AB 1234</h4>
          <p className='text-sm text-gray-600 '>Hundai verna</p>
        </div>
      </div>

      <div className="flex gap-5 flex-col justify-between items-center">
        <div className="w-full mt-6">

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-xl ri-map-pin-range-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600 ">
                Raghu gardens Road, Vijayawada
              </p>
            </div>
          </div>

         
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-xl ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">$8.70</h3>
              <p className="text-sm text-gray-600 ">
                Cash
              </p>
            </div>
          </div>

        </div>
      </div>
    
      <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a Payment</button>
    </div>
   </div>
  )
}

export default UserRiding
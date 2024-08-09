import React from 'react'

const Navbar = () => {
    return (
        <nav className=' mt-4 '>         
            <div className='flex justify-center gap-x-5 items-center'>      
            <div className=' space-y-2 text-center'>
                <h1 className=' text-cyan-300  font-bold text-4xl'>Your To-Do Manager</h1>
                <p className='text-white font-medium'>Manager your Day with our TO-DO List </p>
            </div>
            </div>
        </nav>
    )
}

export default Navbar
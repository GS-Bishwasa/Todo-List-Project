import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-700 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>
                i Task
            </span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-150'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-150'>Task</li>
        </ul>
    </nav>
  )
}

export default navbar

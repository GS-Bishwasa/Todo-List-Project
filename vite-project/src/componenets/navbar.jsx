import React from 'react'

const navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">TaskFlow</h1>
          <div className='flex items-center px-3 py-2 rounded-full'>
          <p className="text-md opacity-90 ">Organize your day</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default navbar

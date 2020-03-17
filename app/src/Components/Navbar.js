import '../Assets/css/main.css'

import React, { useState } from 'react'

import Searchbar from './Searchbar'

const Navbar = ({
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchUpcomingMovies,
  showTrendingMovies,
  showPopularMovies,
  showUpcomingMovies
}) => {
  const [typing, setTyping] = useState(false)
  return (
    <nav className="mb-5 p-5 fixed-top w-100 d-flex flex-column" style={{ zIndex: '10000' }}>
      <Searchbar setTyping={setTyping} />
      <div className={typing ? 'hide' : 'p-3 d-flex align-items-center justify-content-end mt-2'}>
        <span className={showTrendingMovies ? 'mr-3 active btns p-3' : 'mr-3 btns p-3'} onClick={fetchTrendingMovies}>
          Trending
        </span>
        <span className={showPopularMovies ? 'mr-3 active btns p-3' : 'mr-3 btns p-3'} onClick={fetchPopularMovies}>
          Popular
        </span>
        <span className={showUpcomingMovies ? 'mr-3 active btns p-3' : 'mr-3 btns p-3'} onClick={fetchUpcomingMovies}>
          Upcoming
        </span>
      </div>
    </nav>
  )
}

export default Navbar

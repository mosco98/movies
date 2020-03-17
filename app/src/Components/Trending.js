import '../Assets/css/main.css'

import React from 'react'

import Loader from '../Components/Loader'
import MovieCard from '../Components/MovieCard'

const Trending = ({ trendingMovies, loadingTrending }) => {
  if (loadingTrending) {
    return (
      <div
        className="container row d-flex align-items-center justify-content-center p-4"
        style={{ marginTop: '12rem', height: '50vh' }}
      >
        <Loader />
      </div>
    )
  }
  return (
    <section className="container row d-flex justify-content-start p-4 animated fadeIn" style={{ marginTop: '12rem' }}>
      {trendingMovies.map((movie) => {
        return <MovieCard key={movie.id} {...movie} />
      })}
    </section>
  )
}

export default Trending

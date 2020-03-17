import '../Assets/css/main.css'

import React from 'react'
import { Link } from 'react-router-dom'

const imageUrl = 'https://image.tmdb.org/t/p/w500'

const MovieCard = ({ poster_path, id }) => {
  return (
    <div
      className="col-md-3 d-flex flex-column align-items-center justify-content-center "
      style={{
        height: '25rem'
      }}
    >
      <Link to={`/movie/${id}`}>
        <img
          className="img-fluid movie-card shadow rounded"
          style={{ height: '23rem', border: '1px solid #fff' }}
          src={`${imageUrl}/${poster_path}`}
          alt="Poster"
        />
      </Link>
    </div>
  )
}

export default MovieCard

import '../../Assets/css/main.css'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Star } from 'react-feather'

import Loader from '../../Components/Loader'

// import { uuidv4 } from 'uuidv4'

const MovieDetails = (props) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [imgLoading, setImgLoading] = useState(true)

  useEffect(() => {
    getMovie()
  })

  const {
    params: { id }
  } = props.match

  const api = {
    url: `https://api.themoviedb.org/3/movie/${id}?api_key`,
    key: '9ead349eb500ac9645f4d6b87482eeb7'
  }
  const imageUrl = 'https://image.tmdb.org/t/p/original'

  const getMovie = async () => {
    const response = await axios(`${api.url}=${api.key}`)
    setMovie(response.data)
    setIsLoading(false)
  }

  // console.log(movie)
  const {
    backdrop_path,
    title,
    genres,
    overview,
    tagline,
    vote_average,
    spoken_languages,
    release_date,
    homepage,
    runtime
  } = movie

  console.log(movie)

  const getReleaseDate = () => {
    if (release_date) {
      const date = release_date
        .split('-')
        .join(' ')
        .split(' ')

      const monthList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const monthNumber = date[1] - 1
      return `${date[2]} ${monthList[monthNumber]}, ${date[0]}`
    }
  }

  const getRuntime = () => {
    const hour = Math.floor(runtime / 60)
    const minutes = runtime % 60
    return `${hour}h ${minutes}m`
  }
  if (isLoading && imgLoading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="container-fluid vh-100 p-0 animated fadeIn">
      <div
        className="d-flex flex-column justify-content-center align-items-center position-absolute h-100 w-100 movie-details"
        style={{ zIndex: '100000' }}
      >
        <div className="fixed-top p-6 d-flex align-items-center">
          <Star color={'yellow'} fill={'yellow'} size={30} className="mr-2" />
          <span style={{ color: '#fff', opacity: '0.9', fontSize: '1.1rem' }} className="font-weight-light">
            {vote_average}
          </span>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mb-5">
          <h1 className="font-weight-bolder text-center p-3">{title}</h1>
          {tagline ? <small className="mt-n5 font-weight-bold">({tagline})</small> : null}
        </div>
        <h2>Overview</h2>
        <span className="container text-center" style={{ fontSize: '0.9rem', color: '#fff', opacity: '0.8' }}>
          {overview}
        </span>
        <div className="container d-flex justify-content-center w-25 mt-4">
          <h6 className="p-2">Categorie(s): </h6>
          <ul className="px-2 py-1">
            {genres.map((genre) => {
              return (
                <li key={genre.id} className="list-unstyled p-1">
                  {genre.name}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="container d-flex justify-content-center w-25">
          <h6 className="p-2">Language(s): </h6>
          {spoken_languages ? (
            <ul className="px-2 py-1">
              {spoken_languages.map((language) => {
                return (
                  <li key={Math.random()} className="list-unstyled p-1">
                    {language.name}
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
        <hr />
        <div className="row container p-5">
          <span className="col-md-4 d-flex align-items-center justify-content-center ">
            <h6 className="p-2">Release date: </h6>
            <span style={{ fontSize: '0.78rem' }} className="py-4">
              {getReleaseDate()}
            </span>
          </span>
          <span className="col-md-4 d-flex align-items-center justify-content-center ">
            <h6 className="p-2">Duration: </h6>
            <span style={{ fontSize: '0.78rem' }} className="py-4">
              {getRuntime()}
            </span>
          </span>
          <span className="col-md-4 d-flex align-items-center justify-content-center">
            {homepage ? (
              <a
                href={homepage}
                style={{ textDecoration: 'underline', color: '#fff', opacity: '0.6' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                More details
              </a>
            ) : null}
          </span>
        </div>
      </div>

      <img
        className="img-fluid rounded-0 vh-100 p-0 overflow-scroll"
        src={`${imageUrl}/${backdrop_path}`}
        alt="backdrop"
        onLoad={() => setImgLoading(false)}
        style={{ minHeight: '150px', minWidth: '150px' }}
      />
    </div>
  )
}

export default MovieDetails

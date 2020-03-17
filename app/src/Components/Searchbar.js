import '../Assets/css/main.css'

import axios from 'axios'
import React, { useState } from 'react'
import { Star } from 'react-feather'
import { Link } from 'react-router-dom'

import Loader from '../Components/Loader'

const api = {
  searchURL: 'https://api.themoviedb.org/3/search/movie/?api_key',
  key: '9ead349eb500ac9645f4d6b87482eeb7'
}

const Searchbar = ({ setTyping }) => {
  const [title, setTitle] = useState('')
  const [results, setResult] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  const formSubmit = async () => {
    const response = await axios(`${api.searchURL}=${api.key}&query=${title}&language=en-US&page=1&include_adult=false`)

    setResult(response.data.results)
    console.log(response)
    setLoading(false)
    if (!response.data.results.length) {
      setMsg('No search found')
    }
  }
  return (
    <div className="form-inline my-2 my-lg-0 d-flex flex-column justify-content-center align-items-center">
      <input
        className="form-control mr-sm-2 w-50"
        type="search"
        placeholder="Enter Movie title"
        aria-label="Search"
        onChange={(e) => {
          setTitle(e.target.value)
          formSubmit()
          setLoading(true)
          e.target.value.length > 0 ? setTyping(true) : setTyping(false)
        }}
        style={{ minWidth: '300px' }}
      />
      {title.length ? (
        <div
          className="container w-50 d-flex justify-content-center align-items-center h-auto p-1"
          style={{ background: '#fff', zIndex: '1000000', overflow: 'scroll', minWidth: '300px' }}
        >
          {loading ? (
            <div className="p-5">
              <Loader />
            </div>
          ) : (
            <ul className="w-100 py-2 px-0" style={{ height: '10rem' }}>
              {results.length === '0' ? (
                <p>{msg}</p>
              ) : (
                results.map((result) => {
                  return (
                    <Link to={`/movie/${result.id}`}>
                      <li
                        key={result.id}
                        className="w-100 p-3 d-flex align-items-center justify-content-between result"
                        style={{ color: 'rgba(0,0,0,0.8)', cursor: 'pointer' }}
                      >
                        <h6 style={{ color: 'black' }}>{result.title}</h6>
                        <span className="p-2 d-flex align-items-center justify-content-start">
                          <Star color={'yellow'} fill={'yellow'} size={20} />
                          <span className="ml-1" style={{ fontSize: '0.75rem' }}>
                            {result.vote_average}
                          </span>
                        </span>
                      </li>
                    </Link>
                  )
                })
              )}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default Searchbar

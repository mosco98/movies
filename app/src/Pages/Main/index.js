import axios from 'axios'
import React, { Component } from 'react'

import Loader from '../../Components/Loader'
import Navbar from '../../Components/Navbar'
import Popular from '../../Components/Popular'
import Trending from '../../Components/Trending'
import Upcoming from '../../Components/Upcoming'

// import MovieCard from '../../Components/MovieCard'
// import Popular from '../../Pages/Popular'

const api = {
  trendingURL: 'https://api.themoviedb.org/3/trending/all/week?api_key',
  popularURL: 'https://api.themoviedb.org/3/movie/popular?api_key',
  upcomingURL: 'https://api.themoviedb.org/3/movie/upcoming?api_key',
  key: '9ead349eb500ac9645f4d6b87482eeb7'
}

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      trendingMovies: [],
      showTrendingMovies: true,
      popularMovies: [],
      showPopularMovies: false,
      upcomingMovies: [],
      showUpcomingMovies: false,
      loadingTrending: true,
      loadingPopular: true,
      loadingUpcoming: true
    }
  }

  componentDidMount() {
    this.initialFetch()
  }

  initialFetch = async () => {
    const response = await axios(`${api.trendingURL}=${api.key}`)
    this.setState({
      trendingMovies: response.data.results,
      showTrendingMovies: true,
      showPopularMovies: false,
      showUpcomingMovies: false,
      isLoading: false,
      loadingTrending: false
    })
  }
  fetchTrendingMovies = async () => {
    const response = await axios(`${api.trendingURL}=${api.key}`)
    this.setState({
      trendingMovies: response.data.results,
      showTrendingMovies: true,
      showPopularMovies: false,
      showUpcomingMovies: false,
      loadingTrending: false
    })
  }

  fetchPopularMovies = async () => {
    const response = await axios(`${api.popularURL}=${api.key}&language=en-US&page=1`)
    this.setState({
      popularMovies: response.data.results,
      showPopularMovies: true,
      showTrendingMovies: false,
      showUpcomingMovies: false,
      loadingPopular: false
    })
  }
  fetchUpcomingMovies = async () => {
    const response = await axios(`${api.upcomingURL}=${api.key}&language=en-US&page=1`)
    console.log(response)
    this.setState({
      upcomingMovies: response.data.results,
      showUpcomingMovies: true,
      showPopularMovies: false,
      showTrendingMovies: false,
      loadingUpcoming: false
    })
  }
  render() {
    const {
      trendingMovies,
      popularMovies,
      upcomingMovies,
      isLoading,
      showPopularMovies,
      showTrendingMovies,
      showUpcomingMovies,
      loadingTrending,
      loadingPopular,
      loadingUpcoming
    } = this.state
    if (isLoading) {
      return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      )
    }
    return (
      <div className="d-flex flex-column justify-content-start align-items-center animated fadeIn">
        <Navbar
          fetchTrendingMovies={this.fetchTrendingMovies}
          fetchPopularMovies={this.fetchPopularMovies}
          fetchUpcomingMovies={this.fetchUpcomingMovies}
          showTrendingMovies={showTrendingMovies}
          showPopularMovies={showPopularMovies}
          showUpcomingMovies={showUpcomingMovies}
        />
        {showTrendingMovies && <Trending trendingMovies={trendingMovies} loadingTrending={loadingTrending} />}
        {showPopularMovies && <Popular popularMovies={popularMovies} loadingPopular={loadingPopular} />}
        {showUpcomingMovies && <Upcoming upcomingMovies={upcomingMovies} loadingUpcoming={loadingUpcoming} />}
      </div>
    )
  }
}

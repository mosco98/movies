import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Main from './Pages/Main'
import MovieDetails from './Pages/MovieDetails'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/movie/:id" component={MovieDetails} />
    </Switch>
  )
}

export default App

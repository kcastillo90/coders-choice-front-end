import { useState, useEffect } from 'react'
import axios from 'axios'

import Cities from './components/Cities'

const App = () => {

  // Component declarations
  let [cities, getCities] = useState('')

  return(
    <div id="main-container">

      <Cities cities={cities}/>

    </div>
  )
}

export default App

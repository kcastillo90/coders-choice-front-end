import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import '../style.css'

const Cities = (props) => {

  // State Hooks
  const [cities, setCities] = useState([])
  const [newName, setNewName] = useState('')
  const [newState, setNewState] = useState('')
  const [newCountry, setNewCountry] = useState('')
  const [newPopulation, setNewPopulation] = useState('')
  const [newImage, setNewImage] = useState('')

  // useEffect
  useEffect(() => {
    axios
    .get('http://localhost:3000/cities')
    .then((response)=>{
      setCities(response.data)
    })
  })

  // Handlers
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewState = (event) => {
    setNewState(event.target.value)
  }

  const handleNewCountry = (event) => {
    setNewCountry(event.target.value)
  }

  const handleNewPopulation = (event) => {
    setNewPopulation(event.target.value)
  }

  const handleNewImage = (event) => {
    setNewImage(event.target.value)
  }

  const handleUpdateName = (event) => {
    setNewName(event.target.value)
  }

  const handleUpdateState = (event) => {
    setNewState(event.target.value)
  }

  const handleUpdateCountry = (event) => {
    setNewCountry(event.target.value)
  }

  const handleUpdatePopulation = (event) => {
    setNewPopulation(event.target.value)
  }

  const handleUpdateImage = (event) => {
    setNewImage(event.target.value)
  }

  const handleNewCitySubmit = (event) => {
    event.preventDefault()
    axios.post(
      'http://localhost:3000/cities',
      {
        name: newName,
        state: newState,
        country: newCountry,
        population: newPopulation,
        image: newImage,
      }
    ).then( () => {
      axios
        .get('http://localhost:3000/cities')
        .then((response) => {
          setCities(response.data)
          document.getElementById("add-city").reset()
        })
    })
  }

  const handleUpdateCity = (cityData) => {
    axios
    .put(
      `http://localhost:3000/cities/${cityData._id}`,
      {
        name: newName,
        state: newState,
        country: newCountry,
        population: newPopulation,
        image: newImage,
      }
    )
    .then( () => {
      axios
        .get('http://localhost:3000/cities')
        .then((response) => {
          setCities(response.data)
          document.getElementById('edit-city').reset()
      })
    })
  }

  const handleDelete = (cityData) => {
    axios
      .delete(`http://localhost:3000/cities/${cityData._id}`)
      .then( () => {
        axios
          .get('http://localhost:3000/cities')
          .then((response) => {
            setCities(response.data)
          })
      })
  }

  return(
    <main  id="main-container">
      <h1>CITIES OF THE WORLD</h1>
      <section id="display">
        <ul id="cities-list">
          {
            cities.map((city) => {
              return <li>
                <div class="img-div">
                  <img src={city.image}/>
                </div>
                <h3>{city.name}</h3>
                <h3>{city.state}</h3>
                <h3>{city.country}</h3>
                <h3>{city.population}</h3>
                <form id="edit-city" onSubmit={ (event) => { handleUpdateCity(city) }}>
                  Name:       <input name="name" type="text" onChange={handleUpdateName}/><br />
                  State:      <input name="state" type="text" onChange={handleUpdateState}/><br />
                  Country:    <input name="country" type="text" onChange={handleUpdateCountry}/><br />
                  Population: <input name="population" type="text" onChange={handleUpdatePopulation}/><br />
                  Image:      <input name="image" type="text" onChange={handleUpdateImage}/><br />
                  <input class="btn btn-secondary" type="submit" value="SUBMIT EDITS"/>
                  <button class="btn btn-danger" onClick={ (event) => { handleDelete(city) }}>DELETE CITY</button>
                </form>
              </li>
            })
          }
        </ul>
      </section>
      <section id="add">
        <h2>ADD CITY:</h2>
        <form id="add-city" onSubmit={handleNewCitySubmit}>
          Name: <input type="text" onChange={handleNewName}/>
          State: <input name="state" onChange={handleNewState}/>
          Country: <input name="country" onChange={handleNewCountry}/>
          Population: <input name="population" onChange={handleNewPopulation}/>
          Image: <input name="image" onChange={handleNewImage}/>
          <input class="btn btn-success" type="submit" value="ADD CITY"/>
        </form>
      </section>
    </main>
  )
}

export default Cities

import { useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState("")
  const [data, setData] = useState({
    temperature: '',
    humidity: "",
    condition: '',
    windspeed: ''
  })

  const search = () => {
    setLoading(true)
    fetch(`http://api.weatherapi.com/v1/current.json?key=6849b192d62f444b94b90256251809&q=${location}&aqi=yes`)
      .then((data) => data.json()).then((data) => {
        console.log(data);
        if (data.error) {
          return alert("Failed to fetch weather data")
        }
        setData({
          temperature: data?.current?.temp_c + "C",
          humidity: data?.current?.humidity + "%",
          condition: data?.current?.condition?.text,
          windspeed: data?.current?.wind_kph + " kph"
        })
      }).catch((error) => {
        console.error(error.message)
        setData({
          temperature: "",
          humidity: "",
          condition: "",
          windspeed: ""
        })
      });
    setLoading(false)
    // console.log(fullData)
  }

  return (
    <div style={{ backgroundColor: '', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', height: '32px', gap: '18px' }}>
        <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" name="location" id="location" placeholder='Enter city name' />
        <button onClick={search} style={{ backgroundColor: 'green', border: '0px', color: 'white', borderRadius: '8px', padding: '18px', display: 'flex', alignItems: 'center' }}>Search</button>
      </div>

      {data.temperature ? <div style={{ display: "flex", marginTop: '24px' }}>
        <div className="card">
          <p>Temperature</p>
          <p>{data.temperature}</p>
        </div>

        <div className="card">
          <p>Humidity</p>
          <p>{data.humidity}</p>
        </div>

        <div className="card">
          <p>Condition</p>
          <p>{data.condition}</p>
        </div>

        <div className="card">
          <p>Wind Speed</p>
          <p>{data.windspeed}</p>
        </div>
      </div> : loading &&
      <div>
        Loading data...
      </div>

      }
    </div>
  )
}

export default App

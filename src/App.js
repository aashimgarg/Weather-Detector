import React from 'react';
import './App.css';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";


const API_KEY = "1bf4aee8b109a62081092033b5e3c8a6";

class App extends React.Component{

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  }

  getWeather = async (e) => {

    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const API_CALL = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await API_CALL.json();
    console.log(data);
  if(city&&country){
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error:''
    });
  }else{
    this.setState({
     temperature: undefined,
     city: undefined,
     country: undefined,
     humidity: undefined,
     description:undefined,
     error:''
    });   
}
  }
  render() {
    return (
      <div>
      <div className="wrapper">
    <div className="main">
      <div className="container">
         <div className="row">
      <div className="col-xs-5 titleContents">
                  <Titles />
            </div>
      <div className="col-xs-7 formContents">
         <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
           </div>
      </div>
          </div>
          </div>
          </div>
         </div>
    );
  }
};

export default App;

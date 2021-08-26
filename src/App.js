import React from 'react';
import './App.css';
import './components/Info'
import Info from './components/Info';
import Form	from './components/Form';
import Weather	from './components/Weather';

const API_KEY = "1662d8bdd930deaac501d7986f161bea";

class App extends React.Component {

	state = {
		temp: undefined,
		city: undefined,
		country: undefined,
		sunrise: undefined,
		sunset: undefined,
		error: undefined,
	}

	gettingWeather = async (e) => {
		e.preventDefault();
		let city = e.target.elements.city.value;


		if(city) {
			const api_url = await 
			fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
			const data = await api_url.json();
			console.log(data);

			let date = new Date(data.sys.sunset*1000);
			let hours = date.getHours();
			let minutes = "0" + date.getMinutes();
			let seconds = "0" + date.getSeconds();
			let sunset_date = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

			let date2 = new Date(data.sys.sunrise*1000);
			let hours2 = date2.getHours();
			let minutes2 = "0" + date2.getMinutes();
			let seconds2 = "0" + date2.getSeconds();
			let sunrise_date = hours2 + ":" + minutes2.substr(-2) + ":" + seconds2.substr(-2);

			this.setState({
				temp: data.main.temp,
				city: data.name,
				country: data.sys.country,
				sunrise: sunrise_date,
				sunset: sunset_date,
				error: undefined,
			});
		} else {
			this.setState({
				temp: undefined,
				city: undefined,
				country: undefined,
				sunrise: undefined,
				sunset: undefined,
				error: "Введите название города",
			});
		}
		
	}

	render() {
		return (
			<div>
				<Info/> 
				<Form gettingWeather = {this.gettingWeather}/>
				<Weather
					temp = {this.state.temp}
					city = {this.state.city}
					country = {this.state.country}
					sunrise = {this.state.sunrise}
					sunset = {this.state.sunset}
					error = {this.state.error}
				
				/>
			</div>
		);
	}
}

export default App;

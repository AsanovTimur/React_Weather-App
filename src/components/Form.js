import React from 'react';

const Form = (props) => (
	<form onSubmit = {props.gettingWeather}>
        <input type='text' name = 'city' placeholder = 'Введите название города'/>
        <button type = "submit" className = "form_btn">Получить погоду</button>
    </form>
)

export default Form;

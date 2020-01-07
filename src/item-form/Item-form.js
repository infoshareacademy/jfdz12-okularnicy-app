import React from 'react';

export  class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: 'food',
      weather: 'cold',
      description: '',
      img: '',
      itemTypes: [],
      weathers: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleWeatherChange = this.handleWeatherChange.bind(this);


    fetch('./item-types.json')
      .then(data => data.json())
      .then(items => {
        console.log(items)
        this.setState({itemTypes: items})
      }); 
//       .then((data) => {
//         return data.json()
//       }
// )
//       .then(items => {console.log(items)})
      fetch('./weather.json')
        .then(data => data.json())
        .then(weather => {
          console.log(weather)
          this.setState({weathers: weather})
      });
        

}



  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  handleTypeChange(event){
    this.setState({type: event.target.value});
  }
  handleWeatherChange(event) {
    this.setState({weather: event.target.value});
  }

render() {
  return (
    <form>
      <label>
        Name:
        <input type="text"
        name="name"
        value={this.state.name}
        onChange={this.handleNameChange}
        />
      </label>
      <label>
        Type:
        <select name="type" value={this.state.type} onChange={this.handleTypeChange}>
        {this.state.itemTypes.map(item => {
          return <option value={item.type}>{item.type}</option>
        })}
        </select>
        
      </label>
      <label>
        Weather:
        <select name="weather" value={this.state.weather} onChange={this.handleWeatherChange}>
          {this.state.weathers.map(weather => {
            return <option value={weather.type}>{weather.type}</option>
          })}
        </select>
      </label>
      <button type="add">ADD</button>
    </form>
  )
}

}

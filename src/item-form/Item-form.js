import React from 'react';
import { Form } from 'semantic-ui-react';
import "./item-form.css"

export class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      weather: '',
      description: '',
      img: '',
      itemTypes: [],
      weathers: [],
    };
    
          
    this.handleClick = this.handleClick.bind(this);
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
  handleClick(e) {
    this.refs.fileUploader.click();
}


  
render() 

    {
    const optionsType = this.state.itemTypes.map(item => {
        return item
        })
  return (

    <Form className="formGroup">
        <Form.Group>
            <Form.Input label='Name of new item' placeholder='Name' value=''/>
      
            <Form.Field label='Weather' control='select'>
                {this.state.weathers.map(weather => {
                return <option value={weather.type}>{weather.type}</option>
                })}
            </Form.Field>

            <Form.Field label='Type' control='select'>
                {this.state.itemTypes.map(item => {
                return <option placeholder='Weather' value={item.value}>{item.value}</option>
                })}
            </Form.Field>
        </Form.Group>
          <div className="formButtons">   
            <Form.Button onClick={this.handleClick}>
              Add picture
           </Form.Button>
           <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/>
            <Form.Button>
              Add item
            </Form.Button>
          </div> 
    </Form>
  )
}

}

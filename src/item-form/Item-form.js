import React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import uid from "uid"
import firebase from 'firebase'
import "./item-form.css"

const initialState = {
  name: '',
  type: "10",
  weather: ['9'],
  proTip: '',
  description: '',
  img: ''
}

export class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: "10",
      weather: ['9'],
      description: '',
      img: '',
      proTip: '',
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
        this.setState({ itemTypes: items })
      });
    //       .then((data) => {
    //         return data.json()
    //       }
    // )
    //       .then(items => {console.log(items)})
    fetch('./weather.json')
      .then(data => data.json())
      .then(weather => {
        this.setState({ weathers: weather })
      });


  }



  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleTypeChange(event) {
    this.setState({ type: event.target.value });
  }
  handleWeatherChange(event) {
    this.setState({ weather: [event.target.value] });
  }
  handleClick(e) {
    this.refs.fileUploader.click();
  }

  handleInputsChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }
  handleOnImgChange = ({ target }) => {
    this.setState({
      img: target.files[0]
    })
  }

  createTask = (newItem) => {
    fetch(`https://okularnicy-app.firebaseio.com/items.json`, {
      method: 'POST',
      body: JSON.stringify(newItem)
    })
      .then(() => {
        // this.props.onAction();
        this.setState(initialState);
      })
      .catch((err) => {
        alert(err.message)
      });
  }

  handleAddClick = (event) => {
    event.preventDefault()
    const id = uid()

    const newItem = {
      name: this.state.name,
      typeId: this.state.type,
      weather: this.state.weather,
      description: this.state.description,
      proTip: this.state.proTip,
      quantity: 'default',
      image: null
    }
    if (this.state.img) {
      firebase.storage().ref('img/' + id)
        .put(this.state.img)
        .then((res) => {
          res.ref.getDownloadURL().then(url => {
            newItem.image = url;

          })
            .then(() => {
              this.createTask(newItem)
            })
        })

    }
    else {
      this.createTask(newItem)
    }
  }



  render() {
    const optionsType = this.state.itemTypes.map(item => {
      return item
    })
    return (

      <Form className="formGroup">
        <Form.Group>
          <Form.Input label='Name of new item' placeholder='Name' value={this.state.name} onChange={this.handleNameChange} />

          <Form.Field label='Weather' control='select' onChange={this.handleWeatherChange}>
            {this.state.weathers.map(weather => {
              return <option value={weather.id}>{weather.type}</option>
            })}
          </Form.Field>

          <Form.Field label='Type' control='select' onChange={this.handleTypeChange}>
            {this.state.itemTypes.map(item => {
              return <option placeholder='Weather' value={item.key}>{item.value}</option>
            })}
          </Form.Field>

        </Form.Group>
        <Form.Group fluid>
          <Form.Input name='description' label='Description' placeholder='Description' value={this.state.description} onChange={this.handleInputsChange} />
          <Form.Input name='proTip' label='Pro tip' placeholder='Pro tip' value={this.state.proTip} onChange={this.handleInputsChange} />
        </Form.Group>
        <div className="formButtons">
          {this.state.img && <Icon color="green" name='check circle outline' />}
          <Form.Button onClick={this.handleClick}>
            Add picture
           </Form.Button>
          <input onChange={this.handleOnImgChange} type="file" id="file" ref="fileUploader" style={{ display: "none" }} />
          <Form.Button disabled={this.state.name.trim().length === 0} onClick={this.handleAddClick}>
            Add item
            </Form.Button>
        </div>
      </Form>
    )
  }

}

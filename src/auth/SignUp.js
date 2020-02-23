import React from 'react'
import { Button, Form, Message} from 'semantic-ui-react'
import firebase from "firebase";


export class SignUp extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        error: null
    };

    handleOnChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    };

    handleOnClick = (event) => {
        event.preventDefault();
        this.signUp();
    };

    signUp = () => {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = firebase.auth().currentUser

                if (user) {
                    user.updateProfile({
                        displayName: name,
                    })
                        .then(s => console.log(s))
                        .catch(err => console.log(err))
                }
            })
            .catch(({ message }) => {

                this.setState({ error: message });
            }
            );
    };

    render() {
        const { email, password, error, name } = this.state;
        return (
            <Form>
                <Message
                    icon='user plus'
                    header='Create an account'
                    content='register new account'
                />
                <Message
                    icon='x'
                    negative
                    hidden={!error && true}
                    content={error}
                />
                <Form.Input
                    required
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Name'
                    type="text"
                    value={name}
                    name='name'
                    onChange={this.handleOnChange}
                />
                <Form.Input
                    required
                    fluid
                    icon='mail'
                    iconPosition='left'
                    placeholder='E-mail'
                    type="email"
                    value={email}
                    name='email'
                    onChange={this.handleOnChange}
                />
                <Form.Input
                    required
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Hasło'
                    type='password'
                    value={password}
                    name='password'
                    onChange={this.handleOnChange}
                />
                <Button disabled={(email.trim().length < 1 || password.trim().length < 1)} positive content={'Create an account'} fluid onClick={this.handleOnClick} />
            </Form>


        )
    }
}
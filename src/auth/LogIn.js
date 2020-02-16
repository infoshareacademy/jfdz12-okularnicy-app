
import React from 'react';
import { Button, Divider, Grid, Segment, Form, Message } from 'semantic-ui-react'
import firebase from "firebase";

export function Login() {
    return <Segment >
        <Grid columns={2} relaxed='very' stackable>
            <Grid.Column verticalAlign='middle'>
                <SignIn />
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
                <SignUp />
            </Grid.Column>
        </Grid>
        <Divider vertical>Lub</Divider>
    </Segment>
}



export class SignIn extends React.Component {
    state = {
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
        this.signIn();
    };


    signIn = () => {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                const errorCode = error.code;
                if (errorCode == 'auth/user-disabled') {
                    this.setState({ error: 'Twoje konto zostało zablokowane.' });
                }
                else if (errorCode == 'auth/invalid-email') {
                    this.setState({ error: 'Nieprawidłowy adres e-mail.' });
                }
                else if (errorCode == 'auth/user-not-found') {
                    this.setState({ error: 'Dla tego adresu e-mail konto nie istnieje.' });
                }
                else if (errorCode == 'auth/wrong-password') {
                    this.setState({ error: 'Błędne hasło.' });
                }
                else {
                    this.setState({ error: 'nieznany błąd' });
                }
            });
    };

    render() {
        const { email, password, error } = this.state;

        return (<Form>
            <Message
                icon='key'
                header='Zaloguj się'
                content='by używać aplikacji'
            />
            <Message
                icon='x'
                negative
                hidden={!error && true}
                content={error}
            />
            <Form.Input
                required
                type="email"
                fluid icon='user'
                iconPosition='left'
                placeholder='E-mail'
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
            <Button content='Zaloguj' primary fluid onClick={this.handleOnClick} />
        </Form>)
    }
}

export default class SignUp extends React.Component {
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
                    console.log(user);
                    user.updateProfile({
                        displayName: name,
                    })
                        .then(s => console.log(s))
                        .catch(err => console.log(err))
                }
            })
            .catch(error => {
                const errorCode = error.code;
                if (errorCode == 'auth/weak-password') {
                    this.setState({ error: 'Zbyt słabe hasło. Hasło musi mieć co najmniej 6 znaków.' });
                }
                else if (errorCode == 'auth/invalid-email') {
                    this.setState({ error: 'Nieprawidłowy adres e-mail.' });
                }
                else if (errorCode == 'auth/email-already-in-use') {
                    this.setState({ error: 'Dla tego adresu e-mail konto już istnieje.' });
                }
                else if (errorCode == 'auth/operation-not-allowed') {
                    this.setState({ error: 'Błąd rejestracji po stronie serwera. Przepraszamy.' });
                }
                else {
                    this.setState({ error: 'nieznany błąd' });
                }
            });
    };

    render() {
        const { email, password, error, name } = this.state;
        return (
            <Form>
                <Message
                    icon='user plus'
                    header='Rejestracja'
                    content='jeśli jeszcze nie masz konta, zarejestruj się.'
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
                <Button positive content={'Utwórz konto'} fluid onClick={this.handleOnClick} />
            </Form>


        )
    }
}
import React from 'react'
import { Button,Form, Message} from 'semantic-ui-react'
import firebase from "firebase";


export class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
        error: null,
        forgotPassword: false,
        emailSent: null,
        resetError: null
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

    handleOnClickForgot = (event) => {
        event.preventDefault()
        this.setState((prevState) => ({
            forgotPassword: !prevState.forgotPassword
        }))
    }

    handleOnClickResetPassword = (event) => {
        event.preventDefault();
        const auth = firebase.auth();
        const emailAddress = this.state.email;
        this.setState({ eror: null })
        auth.sendPasswordResetEmail(emailAddress).then(() => {
            this.setState({
                emailSent: true,
                resetError: false
            })
        }).catch(({ message }) => {

            this.setState({
                emailSent: false,
                resetError: message
            })
        });
    }


    signIn = () => {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(({ message }) => {

                this.setState({ error: message });
            }
            );
    };

    render() {
        const { email, password, error, forgotPassword, emailSent, resetError } = this.state;

        return forgotPassword
            ? (<Form>
                <Message
                    icon='key'
                    header='Forgot password'
                    content='enter your e-mail to reset password'
                />
                <Message
                    icon='key'
                    positive
                    hidden={emailSent ? false : true}
                    content='E-mail sent. Check your e-mail inbox to reset the password'
                />
                <Message
                    icon='x'
                    negative
                    hidden={!resetError && true}
                    content={resetError}
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
                <Button.Group vertical fluid>
                    <Button content='Reset password' color="orange" fluid onClick={this.handleOnClickResetPassword} />
                    <Button content='back to login' fluid onClick={this.handleOnClickForgot} />
                </Button.Group>

            </Form>)
            : (<Form>
                <Message
                    icon='key'
                    header='Login'
                    content='to use all features'
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
                    placeholder='Password'
                    type='password'
                    value={password}
                    name='password'
                    onChange={this.handleOnChange}
                />
                <Button.Group vertical fluid>
                    <Button disabled={(email.trim().length < 1 || password.trim().length < 1)} content='Login' color='orange' onClick={this.handleOnClick} />
                    <Button content='Forgot password' onClick={this.handleOnClickForgot} />
                </Button.Group>
            </Form>)
    }
}

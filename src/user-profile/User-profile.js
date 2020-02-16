import React from 'react';
import { Icon, Button, Header, Image, Grid, Container, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from 'firebase'

import { MyContext } from '../auth/Auth'


export default class UserProfile extends React.Component {
    static contextType = MyContext
    state = {
        isLoaded: false,
        editPhoto: false,
        img: null,
        refresh: false
    };


    handleclick = () => this.setState(prevState => ({ editPhoto: !prevState.editPhoto }))

    handleOnImgChange = ({ target }) => {
        this.setState({
            img: target.files[0]
        })
    }

    handleSave = () => {
        const userId = firebase.auth().currentUser.uid;
        firebase.storage().ref('users/' + userId)
            .put(this.state.img)
            .then((res) => {
                res.ref.getDownloadURL().then(url => {
                    this.context.state.user.updateProfile({
                        photoURL: url
                    }).then(() => this.setState((prevState) => ({
                        refresh: !prevState.refresh
                    }))).catch(error => console.log(error))
                })

            })
    }

    render() {
        const { editPhoto } = this.state;
        return < Container>
            <Header>User Panel </Header>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                    <Image wrapped size='medium' src={this.context.state.user.photoURL || '/assets/userPlaceholder.jpg'} />

                    {editPhoto
                        ? <Button negative onClick={this.handleclick} compact floated='right'>Change photo</Button>
                        : (<Form>
                            <input type='file' onChange={this.handleOnImgChange} />
                            <Button compact icon='save' content='Zapisz' positive type='submit' onClick={this.handleSave} />
                        </Form>)}
                </Grid.Column>
                <Grid.Column>
                    <Header>Hello {this.context.state.user.displayName || 'stranger'}!</Header>
                    <Button.Group vertical>
                        <Link to={'/user-list'}><Button icon labelPosition='left' primary onClick={this.handleclick} style={{ margin: "5px" }}><Icon fitted name='list' /> My list</Button></Link>
                        <Link to={'/dashboard'}><Button icon labelPosition='left' onClick={this.handleclick} style={{ margin: "5px" }}><Icon fitted name='chart pie' /> Dashboard</Button></Link>
                    </Button.Group>
                </Grid.Column>
            </Grid>
        </ Container>
    }
}
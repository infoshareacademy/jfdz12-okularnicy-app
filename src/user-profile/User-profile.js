import React from 'react';
import { Card, Segment, Icon, Button, Header, Image, Grid, Container, Form, Progress, Label, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from 'firebase'
import 'firebase/storage';

import { MyContext } from '../auth/Auth'


export default class UserProfile extends React.Component {
    static contextType = MyContext
    state = {
        isLoaded: false,
        editPhoto: false,
        img: null,
        uploadProgress: null,
        uploadError: null,
        uploadSuccess: null,
        uploadMessage: "",
        visible: false
    };

    handleDismiss = () => {
        this.setState({ visible: false })
    }

    handleclick = () => this.setState(prevState => ({ editPhoto: !prevState.editPhoto }))

    handleOnImgChange = ({ target }) => {
        this.setState({
            img: target.files[0]
        })
    }

    handleSave = () => {
        const userId = firebase.auth().currentUser.uid;
        const uploadTask = firebase.storage().ref('users/' + userId).put(this.state.img, {
            contentType: 'image/jpeg'
        });
        uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadProgress,
                uploadSuccess: false,
                uploadMessage: "Uploading photo...",
                visible: true,
            })
        }, (uploadError) => {
            this.setState({
                uploadError,
                uploadMessage: "An error occured, please try again.",
                uploadProgress: null

            })
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                this.context.state.user.updateProfile({
                    photoURL: url
                }).then(() => this.setState((prevState) => ({
                    refresh: !prevState.refresh,
                    uploadSuccess: true,
                    uploadMessage: "Photo updated successfully",
                    uploadProgress: !prevState.uploadProgress,
                    editPhoto: false
                })))
            });
        });

    }

    render() {
        const { editPhoto, img, uploadError, uploadProgress, uploadSuccess, visible, uploadMessage } = this.state;
        return < Container>
            <Header>User Panel </Header>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                    <Card>
                        <Message
                            positive={uploadSuccess}
                            hidden={!visible}
                            attached="top"
                            content={<>{uploadMessage}
                                {uploadProgress && <Progress size="tiny" color='blue' percent={uploadProgress} success={uploadSuccess} error={uploadError} />}
                            </>
                            }
                            onDismiss={this.handleDismiss} />
                        <Image centered wrapped size='medium' src={this.context.state.user.photoURL || '/assets/userPlaceholder.jpg'} />
                        {!editPhoto
                            ? <Button color='orange' onClick={this.handleclick}>Change photo</Button>
                            : <Form>
                                <Button.Group fluid>
                                    <label className='fileContainer'>
                                        <Button disabled={uploadProgress} content="Browse" icon="image" />
                                        <input type='file' onChange={this.handleOnImgChange} />
                                    </label>
                                    <Button disabled={!img || uploadProgress} icon='save' content='Zapisz' positive type='submit' onClick={this.handleSave} />
                                    <Button icon='cancel' type='submit' onClick={this.handleclick} />
                                </Button.Group>
                            </Form>}
                    </Card>
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
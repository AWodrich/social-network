import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router';
import { checkFriendStatus, getUserInfos } from './actions';
import { connect } from 'react-redux';
import Profile from './profile';
import {getSocket} from './socket';




// props.children ist coming from react-Router
// Container App


export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this)
        this.setBio = this.setBio.bind(this)
        this.checkForRequests = this.checkForRequests.bind(this)
    }
    componentDidMount() {
        getSocket();
        this.props.dispatch(getUserInfos())
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        })
    }
    setBio(bio) {
        this.setState({
            bio: bio
        })
    }

    setFriendStatus(newStatus){

    }

    checkForRequests(data) {

    }


    render() {
        if (!this.props.user) {
            return null
        }

        let { first, last, imageUrl, bios, id, status } = this.props.user;

        if(!imageUrl) {
            imageUrl = '/defaultProfileImg.jpg'
        }

        const children = React.cloneElement(this.props.children, {
            first,
            last,
            imgUrl: imageUrl,
            bio: bios,
            id,
            showUploader: this.showUploader,
            setBio: this.setBio,
            checkForRequests: this.checkForRequests

        });

        if(!this.state) {
            return(
                <div>Loading....</div>
            )
        }

        return (
            <div>
            <Logo />
                {children}
                {this.state.uploaderIsVisible && <UploadImage />}
                <ProfilePic showUploader={this.showUploader} imgUrl={imageUrl} />
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App);

// <Bio showBio={this.showBio} />




// =================== Child Components =======================================//

// Logo Component

export class Logo extends Component {
    constructor(props) {
        super(props)
        this.state ={}
    }
    render() {

        return(
            <div>
                <img className="logoImg" src="/bitcoin-logo.jpg" />
            </div>
        )
    }
}




// Functionality click on Profile Pic Component

export class ProfilePic extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    render() {


        if(!this.state) {
            return null
        }
        return(
            <div>
                <img onClick={this.props.showUploader} className='profileImg' src={this.props.imgUrl} />
            </div>
        )
    }
}



// Upload Image Component

export class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.uploadImage = this.uploadImage.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    uploadImage(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('file', this.state.file);

        axios.post('/upload', formData)
        .then(res => {
            location.replace('/')
        })
    }
    onChange(e) {
        const state = {};
        state[e.target.type] = e.target.files[0];
        this.setState(state);

    }
    render() {
        return (
            <div className="wrapUploadImage">
                <h3>Would you like to change your profile image?</h3>
                <h1>Upload image</h1>
                    <input onChange={this.onChange} className="file" type="file" name="file" />
                    <button type="button" onClick={this.uploadImage}>Upload Image</button>
            </div>
        )
    }
}


// Profile Component displaying profilePic, first and last name, link to add bio





// Update Bio Component

export class Bio extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        this.setState({
            [e.target.name]:e.target.value
        }, () => console.log('new state', this.state))

    }
    handleSubmit(e){
        e.preventDefault();
        let data = {
            bio: this.state.bio
        }
        axios.post('/update-bio', data)
        .then(result => {
            if(result.data.success) {
                this.props.setBio(result.data.newBio)
                location.replace("/")
            } else {
                this.setState({error:true})
            }
        })
    }
    render(){

        return(
            <div>
                <Profile first={this.props.first} last={this.props.last} imgUrl={this.props.imgUrl}/>
                <div className="addingBioWrapper">
                    <textarea onChange={this.onChange} name="bio" rows="8" cols="80"></textarea>
                    <button onClick={this.handleSubmit}>Save</button>
                    {this.state.error && <div>You made a mistake. Please try again</div>}
                </div>
            </div>
        )
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// View OtherUsers Profiles


// {this.state.status == 0 && 'Send FriendRequest'}

// <button>{condition && text inside button}</button>

export class FriendButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ''
        }
    }

    componentDidMount() {
        console.log('getting params id from props in FriendButton', this.props);
        axios.get('/friend-status/' + this.props.id)
        .then(results => {
            console.log('status on client side', results.data);
            this.props.setFriendStatus(results.data.status)

        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {


        return(
            <h1>Checking Friendship</h1>
        )
    }
}

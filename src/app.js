import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router';



// props.children ist coming from react-Router


// Container App

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this)
        this.setBio = this.setBio.bind(this)
    }
    componentDidMount() {
        axios.get('/user').then(({data}) => {
            // console.log('do i get bios as well?++++', data);
            this.setState({
                first: data.first,
                last: data.last,
                imgUrl: data.imageUrl,
                bio: data.bios,
                id: data.id
            });
        })
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


    render() {

        let { first, last, imgUrl, bio, id } = this.state;
        if(imgUrl == null) {
            imgUrl = '/defaultProfileImg.jpg'
        }

        const children = React.cloneElement(this.props.children, {
            first,
            last,
            imgUrl,
            bio,
            id,
            showUploader: this.showUploader,
            setBio: this.setBio

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
                <ProfilePic showUploader={this.showUploader} imgUrl={imgUrl} />
            </div>
        )
    }
}
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


export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {


        // console.log('props in profile component', this.props.imgUrl);
        return(
            <div>
                <div className="wrapLogoH1">
                    <h1>Welcome, {this.props.first} {this.props.last}, to your Profile Page</h1>
                    <a href="/logout">Logout</a>
                </div>
                <div className="wrapFirstLastLinkAddBio">
                    <img className="profilePic2"src={this.props.imgUrl} />
                    <h3 className="firstLast">{this.props.first} {this.props.last}</h3>
                    {this.props.bio && <h4>{this.props.bio}</h4>}
                    {this.props.bio && <Link className="linkToAddBio" to="/add-bio">Edit Bio</Link>}
                    {!this.props.bio && <h4>No bio added</h4>}
                    {!this.props.bio && <Link className="linkToAddBio" to="/add-bio">Add Bio</Link>}
                </div>
            </div>
        )
    }
}



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

export class OtherUsers extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    componentDidMount() {
        console.log('__________',this.props);
        let id = this.props.params.id
        axios.get('/user.json/' + id).then(({data}) => {
            this.setState(data)
        })
    }
    //
    // checkFriendStatus(data){
    //     this.setState({
    //         active: true,
    //         data: data
    //     })
    // }

    render(){

        // const children = React.cloneElement(this.props.children, {
        //     checkFriendStatus: this.state.checkFriendStatus
        // });
        // console.log('props in OtherUser', this.props);
        return(
            <div className="profile">
                <h1>Welcome, {this.state.first} {this.state.last}, to your webpage.</h1>
                <img className="profileImg" src={this.state.image} />
                <img className="otherProfilePic2" src={this.state.image} />
                <h3 className="firstLast">{this.state.first} {this.state.last}</h3>
                <h4 className="bioOtherUser">{this.state.bios}</h4>
                <button onClick={this.checkFriendStatus}>friends</button>
                {this.state.active && <FriendButton />}
                
            </div>
        )
    }
}

// <button>{condition && text inside button}</button>

export class FriendButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ''
        }
    }

    componentDidMount() {
        // console.log('this.props in FriendButton', this.props);
        axios.get('/friend-status')
        .then(results => {
            console.log(results);
            // this.props.checkFriendStatus(results)
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

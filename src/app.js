import React, { Component } from 'react';
import axios from 'axios';
import { Home } from './home';
import { Link } from 'react-router';



// props.children ist coming from react-Router


// Container App

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this)
    }
    componentDidMount() {
        axios.get('/user').then(({data}) => {
            console.log('do i get bios as well?++++', data);
            this.setState({
                first: data.first,
                last: data.last,
                imgUrl: data.imageUrl,
                bio: data.bios
            });
        })
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        })
    }

    render() {
        var { first, last, imgUrl, bio } = this.state;

        if(imgUrl == null) {
            imgUrl = '/defaultProfileImg.jpg'
        }
        if(bio == null || bio == "No bio added") {
            bio = "No bio added"
        }
        console.log('bio///////////////////////////', bio);

        const children = React.cloneElement(this.props.children, {
            first,
            last,
            showUploader: this.showUploader
        });

        if(!this.state) {
            return(
                <div>Loading....</div>
            )
        }

        return (
            <div>
                {children}
                {this.state.uploaderIsVisible && <UploadImage />}
                <Logo />
                <Bio showBio={bio}/>
                <ProfilePic showUploader={this.showUploader} imgUrl={imgUrl} />
            </div>
        )
    }
}


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
                <img className="logoImg" src="/logo.jpg" />
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
            <div>
            <h3>Would you like to change your profile image?</h3>
            <h1>Upload image</h1>
                <input onChange={this.onChange} className="file" type="file" name="file" />
                <button type="button" onClick={this.uploadImage}>Upload Image</button>
            </div>
        )
    }
}



// Update Bio Component

export class Bio extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.setBio = this.setBio.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        const state = {};
        this.state.updatedBio = e.target.value;

    }
    setBio(e){
        e.preventDefault();
        axios.post('/update-bio', this.state)
        .then(result => {
            // location.replace('/')
            console.log('after updating bio on client side now', result);
        })

    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    render(){
        return(
            <div>
                <h3>Bio:</h3>
                <textarea onChange={this.onChange} rows="8" cols="80">{this.props.showBio}</textarea>
                <button onClick={this.setBio}>Update Bio</button>
            </div>
        )
    }
}

import React from 'react';
import axios from 'axios';
import { Home } from './home';
import { Link } from 'react-router';



// props.children ist coming from react-Router

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // image:'',
            // first:'',
            // last:''
        };
    }
    componentDidMount() {
        axios.get('/user').then(({data}) => {
            this.setState(data);
        })
    }
    render() {
        const setImage = (imgUrl) => {
            this.setState({
                profilePic: imgUrl
            })
        }
        if(!this.state.id) {
            return null;
            // render a spinner if you want
        }
        return (
            <div>
                <Home />
                <ProfilePic
                    image={this.state.profilePic}
                    first={this.state.first}
                    last={this.state.last}
                    showUploader={() => this.setState({uploaderIsVisible: true})}
                />
                {this.state.uploaderIsVisible && <UploadImage setImage={setImage} />}
                {this.props.children}
            </div>
        )
    }
}

export class Logo extends React.Component {
    constructor(props) {
        super(props)
        this.state ={}
    }
    render() {
        return(
            <img className="logoImg" src="../public/logo.jpg" />
        )
    }
}


export class ProfilePic extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    render() {
        return(
            <img onClick={this.props.showUploader} className='profileImg' src="../public/defaultProfileImg.jpg" />

        )
    }
}

export class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.uploadImage = this.uploadImage.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    uploadImage(e) {
        e.preventDefault();

        console.log('what is the state??', this.state);
        var formData = new FormData();
        formData.append('file', this.state.file);

        axios.post('/upload', formData)
        .then(res => {
            console.log(res);
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
                <input onChange={this.onChange} className="file" type="file" name="file" />
                <button type="button" onClick={this.uploadImage}>Upload Image</button>
            </div>
        )
    }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FriendList } from './friendList';
import FetchNews from './fetchNews';



export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
    }

    render() {
        let id = this.props.id

        return(
            <div className="profileWrapper">
                <nav className="header">
                    <h1>Welcome, {this.props.first} {this.props.last}, to your Profile Page</h1>
                    <div className="headerLinks">
                        <a href="/logout">Logout</a>
                        <Link to="/friends">See friends</Link>
                        <Link to="/online">Who is online</Link>
                        <Link to="/chat">Chat</Link>
                    </div>
                    </nav>
                <div className="aside-1">
                    <img className="profilePic2"src={this.props.imgUrl} />
                    <h3 className="firstLast">{this.props.first} {this.props.last}</h3>
                    <h4>Bio</h4>
                    {this.props.bio && <p className="noBioAdded">{this.props.bio}</p>}
                    {this.props.bio && <Link className="linkToAddBio" to="/add-bio">Edit Bio</Link>}
                    {!this.props.bio && <h4 className="noBioAdded">No bio added</h4>}
                    {!this.props.bio && <Link className="linkToAddBio" to="/add-bio">Add Bio</Link>}
                    {this.props.status && <button>{messageOnButton}</button>}
                </div>
                <FetchNews />
                <div className="aside-2" />

            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        friendStatus: state.status
    }
}

export default connect(mapStateToProps)(Profile);

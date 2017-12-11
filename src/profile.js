import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FriendList } from './friendList';



export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){

    }

    render() {
        console.log('this.props.dispatch', this.props);
        let id = this.props.id

        console.log('props in profile component', this.props);
        return(
            <div>
                <div className="wrapLogoH1">
                    <h1>Welcome, {this.props.first} {this.props.last}, to your Profile Page</h1>
                    <a href="/logout">Logout</a>
                    <Link to="/friends">See friends</Link>
                    <Link to="/online">Who is online</Link>
                </div>
                <div className="wrapFirstLastLinkAddBio">
                    <img className="profilePic2"src={this.props.imgUrl} />
                    <h3 className="firstLast">{this.props.first} {this.props.last}</h3>
                    {this.props.bio && <h4 className="noBioAdded">{this.props.bio}</h4>}
                    {this.props.bio && <Link className="linkToAddBio" to="/add-bio">Edit Bio</Link>}
                    {!this.props.bio && <h4 className="noBioAdded">No bio added</h4>}
                    {!this.props.bio && <Link className="linkToAddBio" to="/add-bio">Add Bio</Link>}
                    {this.props.status && <button>{messageOnButton}</button>}
                </div>
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

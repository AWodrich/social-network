import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { checkFriendStatus } from './actions';


export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
        this.props.dispatch(checkFriendStatus())
    }

    renderButtonText(){
        // let messageOnButton;
        // let statusToUpdate;
        // let otherButton;
        // if(this.props.status == 1) {
        //     otherButton = "Reject Friend Request";
        //     messageOnButton = "Accept Friend Request";
        // }
        // if(this.props.status == 2) {
        //     messageOnButton = "Terminate Friendship"
        // }
        // if (status is good) {
        //     return (
        //         <button onClick={this.deleteFriend}>Delete friend</button>
        //     )
        // }
    }

    render() {
        console.log('this.props.dispatch', this.props);

        console.log('props in profile component', this.props);
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
                    {this.props.status && <button>{messageOnButton}</button>}
                    {this.renderButtonText()}
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

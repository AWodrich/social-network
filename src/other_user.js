import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOtherUserInfo, getFriendshipStatus, updateFriendshipStatus } from './actions';


export class OtherUser extends Component {
    constructor(props) {
        super(props)
        this.state={}
        // this.checkFriendStatus = this.checkFriendStatus.bind(this)
        // this.setFriendStatus = this.setFriendStatus.bind(this)
        this.updateFriendshipStatus = this.updateFriendshipStatus.bind(this);
        // this.getButtonTxt = this.getButtonTxt.bind(this);
    }
    componentDidMount() {
        let id = this.props.params.id
        this.props.dispatch(getOtherUserInfo(id))
        this.props.dispatch(getFriendshipStatus(id))
    }

    updateFriendshipStatus(){
        let id = this.props.params.id
        if(this.props.id == this.props.recipientId) {
            if(this.props.params.id == this.props.senderId) {
                this.props.statusFriendship = 3;
            }
        }
        // if(this.props.statusFriendship == 3) {
        //     this.props.statusFriendship = 4
        // }
        this.props.dispatch(updateFriendshipStatus(id, this.props.statusFriendship))
    }

    // checkFriendStatus(){
    //     this.setState({
    //         active: true
    //     })
    // }

    getButtonTxt(){

        let status = this.props.statusFriendship

        switch(status) {
            case 0:
                return 'Add Friend';
                break;
            case 1:
                if(this.props.id == this.props.recipientId) {
                    if(this.props.params.id == this.props.senderId) {
                        return 'Accept Friend Request';
                        break;
                    }
                }
                return 'Cancel Request';
                break;
            case 3:
                return 'End Friendship';
                break;
        }
    }

    render(){
        console.log('this.props.', this.props);
        if (!this.props.otherUserInfo) {
            return null
        }
        // if(!this.props.senderId) {
        //     senderId = 0;
        // }
        // if(!this.props.senderId || this.props.recipientId) {
        //     return null
        // }

        let { first, last, image, bios, id } = this.props.otherUserInfo;
        let status = this.props.statusFriendship;
        if(!image) {
            image = '/defaultProfileImg.jpg'
        }

        return(
            <div className="profile">
                <h1>Welcome, {first} {last}, to your webpage.</h1>
                <img className="profileImg" src={image} />
                <img className="otherProfilePic2" src={image} />
                <h3 className="firstLast">{first} {last}</h3>
                <h4 className="bioOtherUser">{bios}</h4>
                <button onClick={this.updateFriendshipStatus}>{this.getButtonTxt()}</button>
            </div>
        )
    }
}

// {this.props.statusFriendship == 3 && <button onClick={this.deleteFriendStatus}>End Friendship</button>}


const mapStateToProps = function(state) {
    return {
        otherUserInfo: state.otherUserInfo,
        statusFriendship: state.statusFriendship,
        senderId: state.sender,
        recipientId: state.recipient
    }
}

export default connect(mapStateToProps)(OtherUser);

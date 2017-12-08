import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOtherUserInfo, getFriendshipStatus, updateFriendshipStatus } from './actions';

export class OtherUser extends Component {
    constructor(props) {
        super(props)
        this.state={}

        this.updateFriendshipStatus = this.updateFriendshipStatus.bind(this);
    }
    componentDidMount() {
        let id = this.props.params.id
        this.props.dispatch(getOtherUserInfo(id))
        this.props.dispatch(getFriendshipStatus(id))
    }

    updateFriendshipStatus() {
        let id = this.props.params.id
        console.log('what is the status of friendship?', this.props.statusFriendship);
        if (this.props.statusFriendship == 1) {
            if (this.props.id == this.props.recipientId) {
                this.props.dispatch(updateFriendshipStatus(id, 3))
            } else {
                this.props.dispatch(updateFriendshipStatus(id, 4))
            }
        } else if (this.props.statusFriendship == 3) {
            this.props.dispatch(updateFriendshipStatus(id, 4))
        } else {
            this.props.dispatch(updateFriendshipStatus(id, this.props.statusFriendship))
        }
    }

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


const mapStateToProps = function(state) {
    return {
        otherUserInfo: state.otherUserInfo,
        statusFriendship: state.statusFriendship,
        senderId: state.sender,
        recipientId: state.recipient
    }
}

export default connect(mapStateToProps)(OtherUser);

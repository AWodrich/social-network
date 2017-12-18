import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOtherUserInfo, getFriendshipStatus, updateFriendshipStatus } from './actions';
import FetchNews from './fetchNews';

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

    getButtonTxt() {

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

    render() {
        if (!this.props.otherUserInfo) {
            return null
        }

        let { first, last, image, bios, id } = this.props.otherUserInfo;
        let status = this.props.statusFriendship;


        return(

            <div className="profileWrapper">
                <nav className="header">
                    <h1></h1>
                    <div className="headerLinks">
                        <a>Logout</a>
                        <button>See friends</button>
                        <button>Who is online</button>
                        <button>Chat</button>
                        <a>Market</a>
                    </div>
                    </nav>
                <div className="aside-1">
                    {image && <img className="profilePic2" src={image} />}
                    {image && <img className="profileImg" src={image} />}
                    {!image && <img className="profilePic2" src="./defaultProfileImg.jpg" />}
                    {!image && <img className="profileImg" src="./defaultProfileImg.jpg" />}
                    <h3 className="firstLast">{first} {last}</h3>
                    <h4>Interests:</h4>
                    {bios && <p className="noBioAdded">{bios}</p>}
                    {bios && <p>Edit Interests</p>}
                    {!bios && <h4 className="noBioAdded">No Interests added</h4>}
                    {!bios && <p>Add Interests</p>}
                    <button onClick={this.updateFriendshipStatus}>{this.getButtonTxt()}</button>
                </div>
                <FetchNews />
                <div className="aside-2">
                    {this.state.component == 'online' && <Online />}
                    {this.state.component == 'chat' && <Chat />}
                    {this.state.component == 'friends' && <FriendList />}
                </div>
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

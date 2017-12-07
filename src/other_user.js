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
        console.log('do i have access to all props', this.props);
        console.log('++++++', this.props.statusFriendship);
        this.props.dispatch(updateFriendshipStatus(id, this.props.statusFriendship))
    }

    // checkFriendStatus(){
    //     this.setState({
    //         active: true
    //     })
    // }

    getButtonTxt() {
        console.log('this.props.status===========', this.props.statusFriendship);
        let status = this.props.statusFriendship;
        switch(status) {
            case 0:
                return 'Add Friend';
                break;
            case 1:
                return 'Cancel Request'
                break;
        }
    }

    render(){
        if (!this.props.otherUserInfo) {
            return null
        }
        console.log('this.props.', this.props);


        let { first, last, image, bios, id } = this.props.otherUserInfo;
        let status = this.props.statusFriendship;
        console.log('status is in other user', status);
        if(!image) {
            image = '/defaultProfileImg.jpg'
        }

        // switch(status) {
        //     case 0:
        //         return 'Add Friend';
        //         break;
        //     case 1:
        //         return 'Cancel Request'
        //         break;
        // }

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
    console.log('what is state in mapStateToProps in other user', state);
    return {
        otherUserInfo: state.otherUserInfo,
        statusFriendship: state.statusFriendship
    }
}

export default connect(mapStateToProps)(OtherUser);

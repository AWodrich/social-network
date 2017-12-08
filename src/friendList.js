// import Profile from './profile';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from './actions';


export class FriendList extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    componentDidMount() {
        this.props.dispatch(getFriends())
    }



    render() {
        if(!this.props.friends){
            return null
        }
        console.log('///////////', this.props.friends);

        // for(var i = 0; i < this.props.friends; i++) {
        //     if(this.props.friends[i].status == '1') {
        //         console.log('this.props.friends[i]', this.props.friends[i]);
        //         var pendingFriends = this.props.friends[i]
        //         // console.log('pending friends', pendingFriends);
        //     } else if(this.props.friends[i].status == '3') {
        //         var acceptedFriends = this.props.friends[i]
        //     }
        // }


        return(
            <div>
                <h1>This is the friends list</h1>
                <h2>accepted friends: </h2>
                <h2>pending friends: </h2>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    console.log('what is state in mapStateToProps for friend list', state);
    return {
        friends: state.friends
        // pendingFriends: state.friends && state.friends.filter(status => friends.status == '1'),
        // acceptedFriends: state.friends
    }
}

export default connect(mapStateToProps)(FriendList);

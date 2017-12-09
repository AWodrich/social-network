// import Profile from './profile';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from './actions';
import { Link } from 'react-router';
import { endFriendship, acceptFriendship } from './actions';


export class FriendList extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    componentDidMount() {
        this.props.dispatch(getFriends(this.props.id))
        let id = this.props.params.id
    }

    endFriendship(friendId) {
        let userId = this.props.id;
        this.props.dispatch(endFriendship(friendId, userId, 4))
    }

    acceptFriendship(friendId) {
        let userId = this.props.id;
        this.props.dispatch(acceptFriendship(friendId, userId, 3))
    }

    render() {
        let friends = this.props.friends;
        let pending = this.props.pending;
        if(!friends) {
            return (
                <div>
                    <h2>No friends</h2>
                </div>
            )
        }
        if(!pending) {
            return(
                <div>
                    <h2>No pending friend requests</h2>
                </div>
            )
        }



        const accepted = [];
        const friendList = friends.map(friend => {

            accepted.push(
                <div>
                <p>Friends</p>
                <div key={friend.id}>
                    <h2>{friend.first} {friend.last}</h2>
                    <Link to={`/user/${friend.id}`}>
                    <img className="imgFriendsList" src={'https://s3.amazonaws.com/anjaspiced/'+ friend.image} />
                    </Link>
                    <button onClick={() => this.endFriendship(friend.id)}>End Friendship</button>
                </div>
                </div>
            )});


        const pendingList = [];
        const pendingRequests =  pending.map(pending => {

            pendingList.push(
                    <div>
                    <p>Pending Requests</p>
                    <div key={pending.id}>
                        <h2>{pending.first} {pending.last}</h2>
                        <Link to={`/user/${pending.id}`}>
                        <img className="imgFriendsList" src={'https://s3.amazonaws.com/anjaspiced/'+ pending.image} />
                        </Link>
                        <button onClick={() => this.acceptFriendship(pending.id)}>Accept Friendship</button>
                    </div>
                    </div>
            )
        })

        return(
            <div>
                <div>

                    <ul>{accepted}</ul>
                </div>
                <div>

                    <ul>{pendingList}</ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        statusFriendship: state.statusFriendship,
        friends: state.friends && state.friends.filter(user => {
            return user.status == 3;
        }),
        pending: state.friends && state.friends.filter(user => {
            return user.status == 1;
        }),
    }
}

export default connect(mapStateToProps)(FriendList);

// import Profile from './profile';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from './actions';
import { Link } from 'react-router';
import { endFriendship, acceptFriendship } from './actions';
import FetchNews from './fetchNews';


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
        console.log('>>>>>>>this props getting friends list', friends);
        if(!friends) {
            console.log('no friends');
            return (
                <div>
                    <h2 className="noFriends">No friends</h2>
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
                <p className="headlineFriendsList">Friends:</p>
                <div className="friends" key={friend.id}>
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
                    <p className="headlineFriendsList">Pending Requests:</p>
                    <div className="friends" key={pending.id}>
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


            <div className="profileWrapper">
                <nav className="header">
                    <h1>{this.props.first}</h1>
                    <div className="headerLinks">
                        <a href="/logout">Logout</a>
                        <Link to="/friends">See friends</Link>
                        <Link to="/online">Who is online</Link>
                        <Link to="/chat">Chat</Link>
                        <a href="https://www.coindesk.com/price/" target="_blank">Market</a>
                    </div>
                    </nav>
                <div className="aside-1">
                    <img className="profilePic2"src={this.props.imgUrl} />
                    <h3 className="firstLast">{this.props.first} {this.props.last}</h3>
                    <h4>Your Interests:</h4>
                    {this.props.bio && <p className="noBioAdded">{this.props.bio}</p>}
                    {this.props.bio && <Link className="linkToAddBio" to="/add-bio">Edit Interests</Link>}
                    {!this.props.bio && <h4 className="noBioAdded">No Interests added</h4>}
                    {!this.props.bio && <Link className="linkToAddBio" to="/add-bio">Add Interests</Link>}
                    {this.props.status && <button>{messageOnButton}</button>}
                </div>
                <FetchNews />
                <div className="aside-2">
                    <div className="scroll">
                        {!friends || friends.length == 0 && <h2 className="noFriends">No friends</h2>}
                        <ul>{accepted}</ul>
                    </div>
                    <div>
                        {!pending || pending.length == 0 && <h2 className="noFriends">No pending friend request</h2>}
                        <ul>{pendingList}</ul>
                    </div>
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

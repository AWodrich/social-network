// import Profile from './profile';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from './actions';
import { Link } from 'react-router';


export class FriendList extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    componentDidMount() {
        this.props.dispatch(getFriends(this.props.id))
        let id = this.props.params.id
    }

    updateFriendshipStatus() {
        let id = this.props.id
        if (this.props.friends.status == 1 || this.props.pending.status == 1) {
                this.props.dispatch(updateFriendshipStatus(id, 3))
            } else {
                this.props.dispatch(updateFriendshipStatus(id, 4))
            }
        if (this.props.friends.status == 3 || this.props.pending.status == 3) {
            this.props.dispatch(updateFriendshipStatus(id, 4))
        }
    }

    getButtonTxt(status){

        console.log('in button', status);
        // let status = this.props.friends.status || this.props.pending.status

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
        if(!this.props.friends) {
            return null
        }
        if(!this.props.pending) {
            return null
        }

        var accepted = [];
        for (var i = 0; i < this.props.friends.length; i++) {
            var first = this.props.friends[i].first
            var last = this.props.friends[i].last
            var img = 'https://s3.amazonaws.com/anjaspiced/'+ this.props.friends[i].image
            var id = this.props.friends[i].id
            var status = this.props.friends[i].status
            accepted.push(<li key={i}>{first} {last} <Link to={`/user/${id}`}><img className="imgFriendsList" src={img} /></Link><button onClick={this.updateFriendshipStatus}>{this.getButtonTxt(status)}</button></li>);
        }

        var pending = [];
        for(var j = 0; j < this.props.pending.length; j ++) {
            if(!this.props.pending[j].image) {
                var img = '../defaultProfileImg.jpg'
            } else {
                var img = 'https://s3.amazonaws.com/anjaspiced/'+ this.props.pending[j].image
            }
            var first = this.props.pending[j].first
            var last = this.props.pending[j].last
            var id = this.props.pending[j].id
            var status = this.props.pending[j].status
            pending.push(<li key={j}>{first} {last} <Link to={`/user/${id}`}><img className="imgFriendsList" src={img} /></Link><button onClick={this.updateFriendshipStatus}>{this.getButtonTxt(status)}</button></li>);
        }

        console.log('state', this.state);
        console.log('props', this.props);

        return(
            <div>
                <h1>This is the friends list</h1>
                <h2>accepted friends:  {accepted}</h2>
                <h2>pending friends: {pending}</h2>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    console.log('what is state in mapStateToProps for friend list', state);
    return {
        friends: state.friends && state.friends.filter(user => {
            return user.status == 3;
        }),
        pending: state.friends && state.friends.filter(user => {
            return user.status == 1;
        })
    }
}

export default connect(mapStateToProps)(FriendList);

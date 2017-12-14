import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {} from './actions';
import {getSocket} from './socket';


class Online extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    let whosOnline = this.props.usersOnline
    if (!whosOnline) {
      return (<div className="online">
      <p>No one is online....</p>
      </div>);
    }

    const list = [];
    const onlineList = whosOnline.map(user => {
        list.push(
        <div className="online" key={user.id}>
            <p>{user.first} {user.last}</p>
            <Link to={`/user/${user.id}`}>{!user.image && <img className="online onlineImg" src='./defaultProfileImg.jpg' />}
            <img className="onlineImg" src={user.image} alt=""/></Link>
        </div>
        )
    })

    return (
        <div className="headlineOnline">
            <h1>Online Users: </h1>
                <div>{list}</div>
        </div>
    )
  }
}

const mapStateToProps = (state) => (console.log(state),{usersOnline: state.usersOnline});

export default connect(mapStateToProps)(Online);

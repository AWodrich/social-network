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
    console.log('props in online file', this.props);
    let whosOnline = this.props.usersOnline
    if (!whosOnline) {
      return (<div className="online">
      <p>No one is online....</p>
      </div>);
    }

    const list = [];
    const onlineList = whosOnline.map((user) => {
        list.push(
        <div key={user.id}>
            <p>This should be user</p>
            <Link to={`/user/${user.id}`}>{user.first} {user.last}</Link>
            <img className="onlineImg" src={user.image} alt=""/>
        </div>
        )
    })
        console.log('inside list online', list);


    return (
        <div className="online">
            <h1>Whos Online?</h1>

            <div>{list}</div>

        </div>
    )
  }
}

const mapStateToProps = (state) => (console.log(state),{usersOnline: state.usersOnline});

export default connect(mapStateToProps)(Online);

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

    const onlineList = whosOnline.map((user) => {
        <div key={user.id}>
            <Link to={`/user/${user.id}`}>{user.first} {user.last}</Link>
            <img src={user.image} alt=""/>
        </div>
        });


    return (
        <div className="online">
            <h1>Whos Online?</h1>

            <div>{onlineList}</div>

        </div>
    )
  }
}

const mapStateToProps = (state) => ({usersOnline: state.usersOnline});

export default connect(mapStateToProps)(Online);

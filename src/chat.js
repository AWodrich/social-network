import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {postMessage, getMessages} from './actions';
import {getSocket} from './socket';

const mapStateToProps = state => {
    console.log('state', state.messages);
    return{
        messages: state.messages
    }
}

const mapDispatchToProps = dispatch => ({
  postMessage: aMessage => dispatch(postMessage(aMessage)),
  getMessages: () => dispatch(getMessages())
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate() {
    this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
  }

  componentDidMount() {
    this.props.getMessages();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value

    }, () => {
    //   console.log('new state', this.state);
    })
  }

  render() {
      console.log('props?', this.props);
      let messageList =[];
      if (this.props.messages) {
          console.log('////', this.props.messages);
          messageList = this.props.messages.map(message => {
              console.log('message', message);
              messageList.push(
                  <div>
                  <p>{message.first} says: {message.message}</p>
                  </div>
              )
          })
      }

    //   console.log('messageList',messageList );

    // index of array

        return (
            <div id='chat'>
                {this.props.messages &&<div id="chatBox" ref={elem => this.elem = elem}>{messageList}</div>}
                {!this.props.messages &&<div id="chatBox" ref={elem => this.elem = elem}></div> }
                <textarea onChange={this.handleChange} name="composedMessage" id="" cols="30" rows="10"></textarea>
                <button onClick={() => this.props.postMessage(this.state.composedMessage)}>Post</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

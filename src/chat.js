import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {postMessage, getMessages} from './actions';
import {getSocket} from './socket';

const mapStateToProps = state => {
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
    }

    componentDidUpdate() {
        this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
        this.textArea.value =''
    }

    componentDidMount() {
        this.props.getMessages();
    }


    render() {
        let messageList =[];
        if (this.props.messages) {
            this.props.messages.map(message => {
                messageList.push(
                    <div className="chatText">
                        <p>{message.first}: {message.message}</p>
                    </div>
                )
            })
        }

        return (
            <div className="scroll chat">
                <div id="chatBox" ref={elem => this.elem = elem}>{this.props.messages && messageList}</div>
                <textarea ref={textArea => this.textArea = textArea} name="composedMessage"></textarea>
                <button onClick={() => this.props.postMessage(this.textArea.value)}>Post</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

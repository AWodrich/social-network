import React, { Component } from 'react';


export default class Chat extends Component {

    render() {
        return(
            <div className="chatContainer">
                <form className="messageForm">
                    <div className="form-group">
                        <textarea className="message" />
                        <br />
                        <input type="submit" className="submitMessage" value="Send Message" />
                    </div>
                </form>
            </div>
        )
    }
}

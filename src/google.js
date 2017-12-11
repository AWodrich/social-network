import React, { Component } from 'react';



const Container = React.createClass({
  render: function() {
    return <div>Google</div>;
  }
})


export class Container extends Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>News will go here</div>
    )
  }
}


export default GoogleApiComponent({
  apiKey: __GAPI_KEY__
})(Container)

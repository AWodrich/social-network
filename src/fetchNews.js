import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNews } from './actions';


export class FetchNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
    //   news: []
    };
  }

  componentDidMount() {
      this.props.dispatch(getNews())
  }



  render() {
      console.log('inside FetchNews props', this.props);
      if (!this.props.news) {
          return (
              <p>No news...</p>
          )
      } else {
          this.props.news.map(results => {
              console.log('in map');
          })
      }



      return (
          <div className="scroll">

            <ul>
            {this.props.news && this.props.news.map(results => {
                return(
                <div className="newsWrapper" key={results.id}>
                    <h2>{results.title}</h2>
                    <div className="displayNews">
                        <img src={results.urlToImage} />
                        <p>published: {results.publishedAt}</p>
                        <p>url: {results.url}</p>
                        <p>source: {results.source.name}</p>
                    </div>
                </div>
            )
            })}
            </ul>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
    console.log('++++++inside mapStateToProps state', state)
    return {
        news: state.news
    }
}

export default connect(mapStateToProps)(FetchNews);

import React, { Component } from 'react';
import Moment from 'react-moment';
import firebaseService from '../../utils/firebaseService';
import Comments from '../../containers/Comments';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: {},
      comments: [],
      loading: true
    }
  }

  componentWillMount = () => {
    const itemId = this.props.params.itemId;
    firebaseService.child('item').child(itemId).once('value', (snapshot) => {
      const post = snapshot.val();
      this.setState({
        post,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          Loading…
        </div>
      );
    }

    return (
      <div className="Post">
        <a href={this.state.post.url}>
          <h2>{this.state.post.title}</h2>
        </a>
        <div className="text-muted">
          <span>{this.state.post.score} points by {this.state.post.by}</span>
          <span> | <span className="glyphicon glyphicon-time"></span> <Moment format="DD.MM.YYYY hh:mm">{new Date(this.state.post.time*1000)}</Moment></span>
        </div>
        {this.state.post.kids && <Comments itemIds={this.state.post.kids} />}
      </div>
    );
  }
}

export default Post;
import React, { Component } from 'react';
import firebaseService from '../../utils/firebaseService';
import Moment from 'react-moment';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true
    }
  }

  componentWillMount = () => {
    const story = this.props.params.story ? this.props.params.story : 'topstories';
    let itemRef;
    firebaseService.child(story).limitToFirst(20).on('value', (snapshot) => {
      if(itemRef) {
        itemRef.off();
      }
      let ids = snapshot.val();
      let posts = [];
      if (ids.length > 0) {
        this.setState({
          loading: false
        });
        ids.forEach(id => {
          //Get the article details
          itemRef = firebaseService.child('item').child(id);
          itemRef.once('value', (snapshotItem) => {
            posts.push(snapshotItem.val());
            this.setState({
              posts
            });
          });
        });
      }
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
      <div className="Posts">
        { this.state.posts.map((post, i) => {
            return (
              <div key={i}>
                <a href={post.url}>
                  <h2>{ post.title }</h2>
                </a>
                <div className="text-muted">
                  <span>{post.score} points by {post.by}</span>
                  <span> | <span className="glyphicon glyphicon-time"></span> <Moment format="DD.MM.YYYY hh:mm">{new Date(post.time*1000)}</Moment></span>
                  {!!post.kids &&
                    <span> | <a href={'/post/' + post.id}>{post.kids.length} comments</a></span>
                  }
                </div>
              </div>
            );
        })}
      </div>
    );
  }
}

export default Posts;
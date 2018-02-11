import React, { Component } from 'react';
import firebaseService from '../../utils/firebaseService';
import Moment from 'react-moment';
import { debounce } from 'throttle-debounce';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true
    }
    this.currentSize = 20;
  }

  componentDidMount() {
    document.getElementsByClassName('content-wrap')[0].addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.getElementsByClassName('content-wrap')[0].removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
      let o = event.target;
      if(o.offsetHeight + o.scrollTop == o.scrollHeight) {
        this.currentSize += 20;
        console.log('this.currentSize', this.currentSize);
        this.loadItems();
      }
  }

  componentWillMount = () => {
    this.loadItems();
  }

  loadItems = () => {
    const story = this.props.params.story ? this.props.params.story : 'topstories';
    let itemRef;
    firebaseService.child(story).limitToFirst(this.currentSize).on('value', (snapshot) => {
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
    const loader = <div className="loader">Loading ...</div>;

    if (this.state.loading) {
      return (
        <div>
          {loader}
        </div>
      );
    }

    let items = [];
    this.state.posts.forEach((post, i) => {
      items.push(
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
    })

    return (
      <div>
          {items}
      </div>
    );
  }
}

export default Posts;
import React, { Component } from 'react';
import Moment from 'react-moment';
import firebaseService from '../../utils/firebaseService';
import renderHTML from 'react-render-html';

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      children: []
    }
  }

  componentWillMount = () => {
    const itemIds = this.props.itemIds;
    itemIds.forEach(itemId => {
      firebaseService.child('item').child(itemId).once('value', (snapshot) => {
        const comment = snapshot.val();
        //console.log('comment:', comment);
        if (!comment.deleted) {
          this.state.children.push(comment);
          this.setState({
            children: this.state.children
          });
        }
      });
    });
  }

  render() {
    return (
      <div className="comments">
        {this.state.children.map(comment =>
          <div key={comment.id} className="comment well ">
            <div>{renderHTML(comment.text)}</div>
            <div className="text-muted">
              <span>{comment.by}</span>
              <span> | <span className="glyphicon glyphicon-time"></span> <Moment format="DD.MM.YYYY hh:mm">{new Date(comment.time*1000)}</Moment></span>
            </div>
            {!!comment.kids && <Comments itemIds={comment.kids}/>}
          </div>
        )}
      </div>
    )
  }
}

export default Comments;
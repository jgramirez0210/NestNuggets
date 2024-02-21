import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';

class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating
    });
  }

  render() {
    return (
      <Ratings
        rating={this.state.rating}
        widgetRatedColors="blue"
        changeRating={this.changeRating}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget
          widgetDimension="60px"
          svgIconViewBox="0 0 5 5"
          svgIconPath="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
        />
        <Ratings.Widget widgetHoverColor="black" />
        <Ratings.Widget />
      </Ratings>
    );
  }
}

export default StarRating;

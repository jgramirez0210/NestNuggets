import { useState, useEffect } from "react";
import _ from "lodash";
import "./styles.css";

function RatingStars({ initRating, onRatingChanged }) {
  const [rating, setRating] = useState(initRating);

  useEffect(() => {
    // if prop changed, we want to reflect that.
    setRating(initRating);
  }, [initRating]);

  function changeRating(newRating) {
    setRating(newRating);
    onRatingChanged(newRating);
  }

  return (
    <>
      {_.times(5, (index) => (
        <img
          alt="rating stars"
          src={rating >= index + 1 ? '⭐' : '★'}
          key={index}
          onClick={() => changeRating(index + 1)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              changeRating(index + 1);
            }
          }}
          tabIndex={0} // to make the img focusable
        />
      ))}
</
export default function App() {
  return (
    <div className="App">
      <RatingStars
        initRating={3}
        onRatingChanged={(newRating) => {
          console.log(
            `NEW RATING (${newRating}) DETECTED FOR 1.. SAVING TO DB`
          );
        }}
      />
      <RatingStars
        initRating={1}
        onRatingChanged={(newRating) => {
          console.log(
            `NEW RATING (${newRating}) DETECTED FOR 2.. SAVING TO DB`
          );
        }}
      />
    </div>
  );
}

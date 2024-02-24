rating

  return (
    <div className="rating">
      <div className="overview-rating">
        <p>Overview Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label>
              <input
                type="radio"
                id={`rating-${ratingValue}`}
                name="rating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue, 'overview')}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <div className="safety-rating">
        <p>Safety Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label>
              <input
                type="radio"
                id={`rating-${ratingValue}`}
                name="rating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue, 'overview')}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <div className="management-rating">
        <p>Management Rating</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label>
              <input
                type="radio"
                id={`rating-${ratingValue}`}
                name="rating"
                value={ratingValue}
                onClick={() => handleRating(ratingValue, 'overview')}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                size={40}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string,
      category: PropTypes.string,
    }),
  ).isRequired,
};
export default StarRating;

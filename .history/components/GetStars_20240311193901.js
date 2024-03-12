import { FaStar } from 'react-icons/fa';

export default function GetStars(rating) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i}><FaStar
      className="star"
      color={ratingValue <= (helpfulHover || helpfulRating) ? '#ffc107' : '#e4e5e9'}
         />
      </span>);
  }
  return stars;
}

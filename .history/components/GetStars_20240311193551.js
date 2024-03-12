import favStar
export default function GetStars(rating) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i}>favStar</span>);
  }
  return stars;
}

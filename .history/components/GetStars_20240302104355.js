export default function GetStars(rating) {
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<span key={i}>⭐</span>);
  }
  return stars;
}

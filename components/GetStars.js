export default function GetStars(rating) {
  let stars = '';
  for (let i = 0; i < rating; i++) {
    stars += '⭐';
  }
  return stars;
}

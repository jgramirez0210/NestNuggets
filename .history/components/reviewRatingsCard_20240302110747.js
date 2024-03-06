return{
<p>
<span>User Ratings: </span>
{/* Access and display the ratings here */}
{reviewRatingObj && reviewRatingObj.reviewRating && (
  <>
    <span>Overall: {GetStars(reviewRatingObj.reviewRating.overall)}</span><br />
    <span>Management: {GetStars(reviewRatingObj.reviewRating.management)}</span><br />
    <span>Safety: {GetStars(reviewRatingObj.reviewRating.safety)}</span>
  </>
)}
</p>
}

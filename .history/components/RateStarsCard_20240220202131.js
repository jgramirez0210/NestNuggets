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

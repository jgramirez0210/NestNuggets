import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [review, setReview] = useState([]);

  const getAllTheReviews = () => {
    getAllTheReviews(user.uid).then(setReview);
  };

  useEffect(() => {
    getAllTheReviews();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {books.map((book) => (
        <BookCard
          key={book.firebaseKey}
          bookObj={book}
          onUpdate={getAllTheBooks}
        />
      ))}
    </div>
  );
}

export default Home;

import Movie from "./components/movie";

export default function Home() {
  return (
    <div className="flex justify-center items-center gap-4 p-6">
      <Movie
        title="Toy Story"
        poster="movietest.jpg"
        genres={["comedy", "children"]}
      />
      <Movie
        title="Inception"
        poster="inceptiontest.jpg"
        genres={["sci-fi", "thriller"]}
      />
      <Movie
        title="The Lion King"
        poster="lionkingtest.jpg"
        genres={["animation", "adventure"]}
      />
      <Movie
        title="Interstellar"
        poster="interstellartest.jpg"
        genres={["action", "sci-fi"]}
      />
    </div>
  );
}

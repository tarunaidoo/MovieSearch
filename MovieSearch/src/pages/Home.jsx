import MovieCard from "../components/MovieCard";
import {useState, useEffect} from "react";
import '../css/Home.css'
import {getPopularMovies, searchMovies} from '../services/api.js'
function Home(){

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch(err){
                setError("Failed to load movies...")
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) =>{
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        }catch(err){
            setError("Failed to search movies...")
            console.log(err)
        }finally{
            setLoading(false)
        }

        //setSearchQuery("")
    };

    return(
        <div className="home">
            <form onSubmit={handleSearch} className="search-form" >
                <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-btn">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
                ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>)
            }

        </div>
    )
}

export default Home;
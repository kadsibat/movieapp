import { Input,Grid,Container } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { AuthContext } from '../context/AuthContext'

const FEATURED_API = 'https://api.themoviedb.org/3/discover/movie?api_key=d6278b3dc3e6f8f8376a89851c3f8c8f'  //güncel api
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d6278b3dc3e6f8f8376a89851c3f8c8f&query='

const Home = () => {
  const [movies, setMovies] = useState([])
  const [searchMovie, setSearchMovie] = useState("")
  const { currentUser } = useContext(AuthContext);
  const navigate=useNavigate()
  useEffect(() => {
    getMovies(FEATURED_API)
  
  }, [])
  

const getMovies = (API) =>{
  fetch(API)
    .then(res=>res.json())
    .then(res=>setMovies(res.results))
    
}
// console.log(movies);


const handleSubmit = (e) =>{
  e.preventDefault()
if(currentUser && searchMovie){
  getMovies(SEARCH_API + searchMovie)
}else{
  alert("please log in to search a movie")
  navigate("/login")
}
setSearchMovie("")
}
console.log(searchMovie);


  return (
   <div>
     <Grid container>
       <form style = {{width:"100%" ,display:"flex"}}  onSubmit={handleSubmit} >
     <Input  
     value={searchMovie}
     onChange={(e)=>setSearchMovie(e.target.value)}
     placeholder="Search a movie" type="search"
     sx={{
       margin:"2rem auto",
       width:"50%",
     }}/>
     </form>
     </Grid>
     <Container sx={{display:"flex", flexWrap:"wrap"}}>
       {
         movies.map((movie)=>(
          <MovieCard  key={movie.id} {...movie}/>)
         )
       }
       
     </Container>

   </div>
  )
}

export default Home
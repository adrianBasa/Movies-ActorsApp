using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using angular2.Models;
using System.Web.Http.Cors;
using MovieActorWebAPI;

namespace angular2.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MovieDataController : ApiController
    {
        // GET: api/MovieData
        public MovieXActor Get()
        {
            // query la baza de date 
            // trannsformare in IEnumerable<MovieXActor>
            using (var db = new angularEntities1())
            {
                var actors = db.Actors;
                var movies = db.Movies;
                return CreateDataForView(actors, movies);
            }
            return null;
        }

        private MovieXActor CreateDataForView(DbSet<Actor> actors, DbSet<Movie> movies)
        {
            return new MovieXActor()
            {
                Actors = FormatActors(actors).ToList(),
                Movies = FormatMovies(movies).ToList()
            };
        }

        private IEnumerable<ActorViewModel> FormatActors(DbSet<Actor> actors)
        {
            var actoriFormatati = new List<ActorViewModel>();
            foreach (var actor in actors)
            {
                actoriFormatati.Add(
                    new ActorViewModel()
                    {
                        Data_Nasterii = actor.Data_Nasterii,
                        Id_Actor = actor.Id_Actor,
                        Nume = actor.Nume_Actor,
                        img = actor.img
                    }
                    );
            }
            return actoriFormatati;
        }

        private IEnumerable<MovieViewModel> FormatMovies(DbSet<Movie> movies)
        {
            var filmeFormatate = new List<MovieViewModel>();
            foreach(var movie in movies)
            {
                filmeFormatate.Add(
                    new MovieViewModel()
                    {
                        Anul_Prductiei = movie.Anul_Prductiei, Denumire = movie.Denumire,
                        Genul = movie.Genul, Id_movie = movie.Id_Movies, Id_Actors = movie.Actors.Select(a => a.Id_Actor).ToList()
                    }
                    );
            }
            return filmeFormatate;
        }

        // GET: api/MovieData/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/MovieData
        public void Post([FromBody]MovieViewModel movie)
        {
            // validare
            using (var db = new angularEntities1())
            {
                db.Set<Movie>().Add(MovieViewModelToDbModel(movie));
                db.SaveChanges();
            }
        }

        private Movie MovieViewModelToDbModel(MovieViewModel movie)
        {
            var dbMovie = new Movie() {
                Denumire = movie.Denumire, Genul = movie.Genul, Anul_Prductiei = movie.Anul_Prductiei
            };
            return dbMovie;
        }

        // PUT: api/MovieData/5
        public IHttpActionResult Put([FromBody]MovieViewModel movie)
        {
            using (var db = new angularEntities1())
            {
                var existingMovie = db.Movies.Where(s => s.Id_Movies == movie.Id_movie)
                                                        .FirstOrDefault<Movie>();

                if (existingMovie != null)
                {
                    existingMovie.Denumire = movie.Denumire;
                    existingMovie.Genul = movie.Genul;
                    existingMovie.Anul_Prductiei = movie.Anul_Prductiei;

                    db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        // DELETE: api/MovieData/5
        [HttpDelete]
        [Route("{id}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Delete(int movieId)
        {

            using (var db = new angularEntities1())
            {
                var existingMovie = db.Movies.Where(s => s.Id_Movies == movieId)
                                                        .FirstOrDefault<Movie>();

                if (existingMovie == null)
                {

                    return NotFound();

                }
                else
                {
                    db.Movies.Remove(existingMovie);
                    db.SaveChanges();
                }
            }

        return Ok();
         
        }

        [HttpDelete]
        [Route("DeleteMovie/{id}")]
        public IHttpActionResult DeleteMovie(int movieId)
        {

            using (var db = new angularEntities1())
            {
                var existingMovie = db.Movies.Where(s => s.Id_Movies == movieId)
                                                        .FirstOrDefault<Movie>();

                if (existingMovie == null)
                {

                    return NotFound();

                }
                else
                {
                    db.Movies.Remove(existingMovie);
                    db.SaveChanges();
                }
            }

            return Ok();

        }
    }
}

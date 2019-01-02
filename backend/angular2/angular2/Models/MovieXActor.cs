using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace angular2.Models
{
    public class MovieXActor
    {
        public IEnumerable<ActorViewModel> Actors;
        public IEnumerable<MovieViewModel> Movies;

    }
}
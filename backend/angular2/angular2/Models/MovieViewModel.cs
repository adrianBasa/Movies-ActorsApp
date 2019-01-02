using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace angular2.Models
{
    public class MovieViewModel
    {
        public int Id_movie { get; set; }
        public string Denumire { get; set; }
        public string Genul { get; set; }
        public string Anul_Prductiei { get; set; }
        public List<int> Id_Actors { get; set; }
    }
}
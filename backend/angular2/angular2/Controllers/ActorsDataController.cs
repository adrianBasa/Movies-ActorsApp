using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Cors;
using MovieActorWebAPI;

namespace angular2.Controllers
{
  [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ActorsDataController : ApiController
    {
        private angularEntities1 db = new angularEntities1();

        // GET: api/ActorsData
        public IQueryable<Actor> GetActors()
        {
            return db.Actors.AsQueryable();
        }

        

        // PUT: api/ActorsData/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutActor(int id, Actor actor)
        {
          

           

            db.Entry(actor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ActorsData
        [ResponseType(typeof(Actor))]
        public IHttpActionResult PostActor(Actor actor)
        {
           

            db.Actors.Add(actor);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = actor.Id_Actor }, actor);
        }

        // DELETE: api/ActorsData/5
        [ResponseType(typeof(Actor))]
        public IHttpActionResult DeleteActor(int id)
        {
            using (var db = new angularEntities1())
            {
                var existingActor = db.Actors.Where(s => s.Id_Actor == id)
                                                        .FirstOrDefault<Actor>();

                if (existingActor == null)
                {

                    return NotFound();

                }
                else
                {
                    db.Actors.Remove(existingActor);
                    db.SaveChanges();
                }
            }

            return Ok();

        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ActorExists(int id)
        {
            return db.Actors.Count(e => e.Id_Actor == id) > 0;
        }
    }
}

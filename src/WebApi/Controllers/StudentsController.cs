using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatthewFordUs.NextApp.Common;
using MatthewFordUs.NextApp.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace MatthewFordUs.NextApp.WebApi.Controllers {
  [Produces("application/json")]
  [Route("api/students")]
  public class StudentsController : Controller {
    private readonly SchoolDbContext _context;

    public StudentsController(SchoolDbContext context) {
      _context = context;
    }

    // GET: api/Students
    [HttpGet]
    public IEnumerable<Student> GetResources()
    {
      Console.WriteLine($"student count: {_context.Students.Count()}");
      return from s in _context.Students select s; // where s.SupersededTimestamp == DateTime.MaxValue select s;
    }

    // GET: api/students/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetResource([FromRoute] Guid id) {
      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      var student = await (
          from s in _context.Students
          where s.Id == id && s.SupersededTimestamp == DateTime.MaxValue
          select s)
        .SingleOrDefaultAsync();

      if (student == null) {
        return NotFound();
      }

      return Ok(student);
    }

    // PUT: api/students/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutResource([FromRoute] Guid id, [FromBody] Student student) {
      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      if (id != student.Id) {
        return BadRequest();
      }

      var now = DateTime.UtcNow;
      var previousStudent = await (
          from s in _context.Students
          where s.Id == id && s.SupersededTimestamp == DateTime.MaxValue
          select s)
        .SingleOrDefaultAsync();
      previousStudent.SupersededTimestamp = now;

      student.EnteredTimestamp = now;
      student.SupersededTimestamp = DateTime.MaxValue;
      student.ETag = Guid.NewGuid();
      _context.Students.Add(student);

      try {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException) {
        if (!StudentExists(id)) {
          return NotFound();
        }
        else {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/students
    [HttpPost]
    public async Task<IActionResult> PostResource([FromBody] Student student) {
      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      student.EnteredTimestamp = DateTime.Now;
      student.SupersededTimestamp = DateTime.MaxValue;
      student.ETag = Guid.NewGuid();
      _context.Students.Add(student);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetResource", new {id = student.Id}, student);
    }

    // DELETE: api/students/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteResource([FromRoute] Guid id) {
      if (!ModelState.IsValid) {
        return BadRequest(ModelState);
      }

      var student = await (
          from s in _context.Students
          where s.Id == id && s.SupersededTimestamp == DateTime.MaxValue
          select s)
        .SingleOrDefaultAsync();
      if (student == null) {
        return NotFound();
      }

      student.SupersededTimestamp = DateTime.Now;
      await _context.SaveChangesAsync();

      return Ok(student);
    }

    private bool StudentExists(Guid id) {
      return _context.Students.Any(e => e.Id == id);
    }
  }
}

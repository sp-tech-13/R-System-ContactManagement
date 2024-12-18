using CMS_API.Models;
using CMS_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ContactRepository _repository;

        public ContactsController(ContactRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_repository.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var Contact = _repository.GetById(id);
            if (Contact == null) return NotFound();
            return Ok(Contact);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Contact Contact)
        {
            throw new ArgumentNullException("This is testing");
            _repository.Add(Contact);
            return CreatedAtAction(nameof(GetById), new { id = Contact.Id }, Contact);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Contact ContactObj)
        {
            if (id != ContactObj.Id) return BadRequest();

            var existing = _repository.GetById(id);
            if (existing == null) return NotFound();

            _repository.Update(ContactObj);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = _repository.GetById(id);
            if (existing == null) return NotFound();

            _repository.Delete(id);
            return NoContent();
        }
    }
}

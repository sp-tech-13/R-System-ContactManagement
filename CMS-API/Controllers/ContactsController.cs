using CMS_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CMS_API.services.interfaces;

namespace CMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _repository;

        public ContactsController(IContactService repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_repository.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var Contact = _repository.GetById(id);
            if (Contact == null) return NotFound();
            return Ok(Contact);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Contact Contact)
        {
            if(!ModelState.IsValid) { return BadRequest(ModelState); }

            _repository.Add(Contact);
            return CreatedAtAction(nameof(GetById), new { id = Contact.Id }, Contact);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Contact ContactObj)
        {
            if (id != ContactObj.Id) return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = _repository.GetById(id);
            if (existing == null) return NotFound();

            _repository.Update(ContactObj);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = _repository.GetById(id);
            if (existing == null) return NotFound();

            _repository.Delete(id);
            return NoContent();
        }
    }
}

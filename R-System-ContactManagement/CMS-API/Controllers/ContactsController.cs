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
        /// <summary>
        /// Get all the contacts
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAll() => Ok(_repository.GetAll());

        /// <summary>
        /// Get contact by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var Contact = _repository.GetById(id);
            if (Contact == null) return NotFound();
            return Ok(Contact);
        }

        /// <summary>
        /// create new contact
        /// @contact: object with all the contact properties
        /// </summary>
        /// <param name="Contact"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Create([FromBody] Contact Contact)
        {
            if(!ModelState.IsValid) { return BadRequest(ModelState); }

            _repository.Add(Contact);
            return CreatedAtAction(nameof(GetById), new { id = Contact.Id }, Contact);
        }

        /// <summary>
        /// update the contact by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ContactObj"></param>
        /// <returns></returns>
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

        /// <summary>
        /// delete the contact by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

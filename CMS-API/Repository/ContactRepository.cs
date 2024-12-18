using CMS_API.Models;
using CMS_API.Services;

namespace CMS_API.Repository
{
    public class ContactRepository
    {
        private readonly JsonFileService _jsonFileService;

        public ContactRepository(JsonFileService jsonFileService)
        {
            _jsonFileService = jsonFileService;
        }

        public List<Contact> GetAll() => _jsonFileService.GetAll();

        public Contact? GetById(int id) => GetAll().FirstOrDefault(p => p.Id == id);

        public void Add(Contact Contact)
        {
            var Contacts = GetAll();
            Contact.Id = Contacts.Any() ? Contacts.Max(p => p.Id) + 1 : 1;
            Contacts.Add(Contact);
            _jsonFileService.SaveAll(Contacts);
        }

        public void Update(Contact updatedContact)
        {
            var Contacts = GetAll();
            var index = Contacts.FindIndex(p => p.Id == updatedContact.Id);
            if (index == -1) return;

            Contacts[index] = updatedContact;
            _jsonFileService.SaveAll(Contacts);
        }

        public void Delete(int id)
        {
            var Contacts = GetAll();
            var Contact = Contacts.FirstOrDefault(p => p.Id == id);
            if (Contact == null) return;

            Contacts.Remove(Contact);
            _jsonFileService.SaveAll(Contacts);
        }
    }
}

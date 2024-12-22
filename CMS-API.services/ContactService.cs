using CMS_API.Models;
using CMS_API.services.interfaces;
using CMS_API.Services;
using CMS_API.data;
using CMS_API.data.interfaces;

namespace CMS_API.Services
{
    public class ContactService: IContactService
    {
        private readonly IDataService _jsonFileService;

        public ContactService(IDataService jsonFileService)
        {
            _jsonFileService = jsonFileService;
        }

        public List<Contact> GetAll() => _jsonFileService.GetAll();

        public Contact? GetById(int id) => GetAll().FirstOrDefault(p => p.Id == id);

        public Contact Add(Contact Contact)
        {
            var Contacts = GetAll();
            Contact.Id = Contacts.Any() ? Contacts.Max(p => p.Id) + 1 : 1;
            Contacts.Add(Contact);
            _jsonFileService.SaveAll(Contacts);
            return Contact; 
        }

        public bool Update(Contact updatedContact)
        {
            var Contacts = GetAll();
            var index = Contacts.FindIndex(p => p.Id == updatedContact.Id);
            if (index == -1) return false;
             
            Contacts[index] = updatedContact;
            _jsonFileService.SaveAll(Contacts);
            return true;
        }

        public bool Delete(int id)
        {
            var Contacts = GetAll();
            var Contact = Contacts.FirstOrDefault(p => p.Id == id);
            if (Contact == null) return false;

            Contacts.Remove(Contact);
            _jsonFileService.SaveAll(Contacts);
            return true;    
        }
    }
}

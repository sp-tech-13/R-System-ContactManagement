using CMS_API.Models;

namespace CMS_API.services.interfaces
{
    public interface IContactService
    {
        List<Contact> GetAll();
        Contact GetById(int id);
        Contact Add(Contact Contact);
        bool Update(Contact updatedContact);
        bool Delete(int id);

    }
}

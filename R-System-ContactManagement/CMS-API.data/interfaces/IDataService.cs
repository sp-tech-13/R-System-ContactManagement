using CMS_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_API.data.interfaces
{
    public interface IDataService
    {
        List<Contact> GetAll();

        void SaveAll(List<Contact> contacts);
    }
}

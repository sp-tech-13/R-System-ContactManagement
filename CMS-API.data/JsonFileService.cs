namespace CMS_API.data
{
    using CMS_API.data.interfaces;
    using CMS_API.Models;
    using System.Text.Json;
    public class JsonFileService : IDataService
    {
        private readonly string _filePath;

        public JsonFileService(string filePath)
        {
            _filePath = filePath;
        }

        public List<Contact> GetAll()
        {
            if (!File.Exists(_filePath))
                return new List<Contact>();

            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Contact>>(json) ?? new List<Contact>();
        }

        public void SaveAll(List<Contact> contacts)
        {
            var json = JsonSerializer.Serialize(contacts, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }

    }
}

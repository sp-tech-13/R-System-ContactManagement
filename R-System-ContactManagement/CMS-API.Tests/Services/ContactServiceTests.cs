using CMS_API.data;
using CMS_API.data.interfaces;
using CMS_API.Models;
using CMS_API.services.interfaces;
using CMS_API.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS_API.Tests.Services
{
    public class ContactServiceTests
    {
        private readonly Mock<IDataService> _mockJsonFileService;
        private readonly ContactService _service;

        public ContactServiceTests()
        {
            _mockJsonFileService = new Mock<IDataService>();
            _service = new ContactService(_mockJsonFileService.Object);
        }

        [Test]
        public void GetContactById_ValidId_ReturnsContact()
        {
            // Arrange
            List<Contact> contacts = new List<Contact>
            { new Contact { Id = 1, FirstName = "Sanjay", LastName = "patel", Email = "sanjay.patel@gmail.com" } };

            _mockJsonFileService.Setup(r => r.GetAll()).Returns(contacts);

            // Act
            var result = _service.GetById(1);

            // Assert
            Assert.NotNull(result);
            Assert.AreEqual(contacts[0], result);
        }

        [Test]
        public void AddContact_ValidContact_ReturnsContact()
        {
            // Arrange
            List<Contact> contacts = new List<Contact>
            { new Contact { FirstName = "New first", LastName = "new last", Email = "new@gmail.com" } };

            _mockJsonFileService.Setup(r => r.GetAll()).Returns(contacts);

            
            // Act
            var result = _service.Add(contacts[0]);
            _mockJsonFileService.Setup(r => r.SaveAll(contacts));


            // Assert
            Assert.NotNull(result);
            Assert.AreEqual(contacts[0], result);
        }
    }
}

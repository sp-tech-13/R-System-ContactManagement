using CMS_API.Controllers;
using Microsoft.AspNetCore.Mvc;
using CMS_API.Models;
using CMS_API.Services;
using Moq;
using CMS_API.services.interfaces;

namespace CMS_API.Tests.Controllers
{
    [TestFixture]
    public class ContactsControllerTests
    {
        private Mock<IContactService> _mockContactService;
        private ContactsController _controller;

        [SetUp]
        public void Setup()
        {
            _mockContactService = new Mock<IContactService>();
            _controller = new ContactsController(_mockContactService.Object);
        }

        [Test]
        public void GetContact_ValidId_ReturnsOkResult()
        {
            // Arrange
            var contact = new Contact { Id = 1, FirstName = "Sanjay", LastName = "patel", Email = "sanjay.patel@gmail.com" };
            _mockContactService.Setup(s => s.GetById(1)).Returns(contact);

            // Act
            var result = _controller.GetById(1) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual(contact, result.Value);
        }

        [Test]
        public void GetContact_InvalidId_ReturnsNotFoundResult()
        {
            // Arrange
            _mockContactService.Setup(s => s.GetById(1)).Returns((Contact)null);

            // Act
            var result = _controller.GetById(1);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public void AddContact_ValidContact_ReturnsCreatedResult()
        {
            // Arrange
            var contact = new Contact { FirstName = "Sanjay", LastName = "Patel", Email = "sanjay.patel@gmail.com" };
            var createdContact = new Contact { Id = 1, FirstName = "Sanjay", LastName = "Patel", Email = "sanjay.patel@gmail.com" };

            var value = _mockContactService.Setup(s => s.Add(contact)).Returns(createdContact);

            // Act
            var result = _controller.Create(contact) as CreatedAtActionResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(201, result.StatusCode);
            //Assert.AreEqual(createdContact, result.Value);
        }

        [Test]
        public void AddContact_InvalidModel_ReturnsBadRequest()
        {
            // Arrange
            _controller.ModelState.AddModelError("Name", "Required");

            // Act
            var result = _controller.Create(new Contact()) as BadRequestObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
        }

        [Test]
        public void UpdateContact_ValidId_ReturnsNoContentResult()
        {
            // Arrange
            var contact = new Contact { Id = 1, FirstName = "Updated Name", LastName = "Patel", Email = "sanjay.patel@gmail.com" };
            _mockContactService.Setup(s => s.GetById(1)).Returns(contact);
            _mockContactService.Setup(s => s.Update(contact)).Returns(true);

            // Act
            var result = _controller.Update(1, contact);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public void UpdateContact_InvalidId_ReturnsNotFoundResult()
        {
            // Arrange
            var contact = new Contact { Id = 1, FirstName = "Updated Name", LastName = "Patel", Email = "sanjay.patel@gmail.com" };
            _mockContactService.Setup(s => s.GetById(0)).Returns(contact);
            _mockContactService.Setup(s => s.Update(contact)).Returns(false);

            // Act
            var result = _controller.Update(1, contact);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public void DeleteContact_ValidId_ReturnsNoContentResult()
        {
            // Arrange
            var contact = new Contact { Id = 1, FirstName = "Sanjay", LastName = "Patel", Email = "sanjay.patel@gmail.com" };
            _mockContactService.Setup(s => s.GetById(1)).Returns(contact);
            _mockContactService.Setup(s => s.Delete(1)).Returns(true);

            // Act
            var result = _controller.Delete(1);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public void DeleteContact_InvalidId_ReturnsNotFoundResult()
        {
            // Arrange
            var contact = new Contact { Id = 0, FirstName = "Sanjay", LastName = "Patel", Email = "sanjay.patel@gmail.com" };
            _mockContactService.Setup(s => s.GetById(0)).Returns(contact);

            _mockContactService.Setup(s => s.Delete(1)).Returns(false);

            // Act
            var result = _controller.Delete(1);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }
    }
}
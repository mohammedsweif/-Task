using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AddressBook.imageservices;
using Castle.Core.Internal;
using ClosedXML.Excel;
using Data.Models;
using Inferastructure.interfaces;
 
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace AddressBook.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IunitOfWork _uow;
        private readonly Ireposatory<Book> _repo;
        private static IWebHostEnvironment environment;
        private static IHttpContextAccessor contextAccessor;
    
        public BookController(IunitOfWork uow, Ireposatory<Book> repo, IWebHostEnvironment _environmen, IHttpContextAccessor _contextAccessor)
        {
            _uow = uow;
            environment = _environmen;
            contextAccessor = _contextAccessor;

            _repo = repo;
         
        }
        [HttpGet]
        [Route("allbooks")]
        public IActionResult AllBooks()
        {
           
            var n = _repo.Get().ToList();
            if (n != null)
            {
                if (n.Count != 0)
                {
                    var x = _repo.Get().Select(e => new
                    {
                        FullName = e.FullName,
                        Jobtitle = e.job,
                        DepName = e.department,
                        Mobile = e.Mobile,
                        BirthDate = e.BirthDate.ToString("yyyy/MM/dd"),
                        Address = e.Address,
                        Photo = imageservice.Process(e.Photo, contextAccessor),
                        Email = e.Email,
                        Age = (DateTime.Now.Year - e.BirthDate.Year),
                        id =e.Id
                    }).ToList();


                    return Ok(x);
                }
            }
            return NotFound(new { mess = "sorry ther is no data" });

        }
       
        
        [HttpPost]
        [Route("AddBook")]
        public IActionResult AddBook(Book entity)
        {
            if (ModelState.IsValid)
            {
                if (entity.Photo.IsNullOrEmpty())
                {
                    entity.Photo = "04bde6b4-a16a-4da7-83e4-89aa5186f286.png";
                }
                else
                {
                    entity.Photo = imageservice.ConvertImage(entity.Photo, environment);
                }   
                _repo.Add(entity);
                _uow.Commit();
                return Ok();
            }
            return BadRequest("the data is not valid");

        }
        [HttpPut]
        [Route("UpdateBook")]
        public IActionResult UpdateBook(Book entity)
        {
            if (ModelState.IsValid)
            {
                Book b= _repo.Get().FirstOrDefault(e => e.Id == entity.Id);
                b.FullName = entity.FullName;

                b.JobTitle = entity.JobTitle;
                b.DepartmentId = entity.DepartmentId;
                b.Mobile = entity.Mobile;
                b.BirthDate = entity.BirthDate;
                b.Address = entity.Address;
                b.Email = entity.Email;
                if (b.Photo != "") {
                    b.Photo = imageservice.ConvertImage(entity.Photo, environment); }

               

                _uow.Commit();
                return Ok();
            }
            return BadRequest("Not found before");

        }
        [HttpDelete]
        [Route("DeleteBook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            Book book = _repo.Get().FirstOrDefault(e => e.Id == id);
            if (book != null)
            {
                _repo.Delete(book);
            
                _uow.Commit();
                return Ok();
              
            }
            return BadRequest("Not found before");

        }
   
        [HttpGet]
        [Route("Exel")]
        public IActionResult Exel() {
            using (var workbook = new XLWorkbook()) {
                var worksheet = workbook.Worksheets.Add("books");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "FullName";
                worksheet.Cell(currentRow, 2).Value = "JobTitle";
                worksheet.Cell(currentRow, 3).Value = "DepName";
                worksheet.Cell(currentRow, 4).Value = "Mobile";
                worksheet.Cell(currentRow, 5).Value = "BirthDate";
                worksheet.Cell(currentRow, 6).Value = "Address";
                worksheet.Cell(currentRow, 7).Value = "Email";
                worksheet.Cell(currentRow, 8).Value = "Age";
                foreach (var book in _repo.Get())
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = book.FullName;
                    worksheet.Cell(currentRow, 2).Value = book.job.Jobtitle;
                    worksheet.Cell(currentRow, 3).Value = book.department.DepName;
                    worksheet.Cell(currentRow, 4).Value = book.Mobile;
                    worksheet.Cell(currentRow, 5).Value = book.BirthDate.ToString("MM/dd/yyyy");
                    worksheet.Cell(currentRow, 6).Value = book.Address;
                    worksheet.Cell(currentRow, 7).Value = book.Email;
                    worksheet.Cell(currentRow, 8).Value = (DateTime.Now.Year - book.BirthDate.Year);
                     
                }
                    using (var streem = new MemoryStream())
                   {
                    workbook.SaveAs(streem);
                    var contect = streem.ToArray();
                    return File(contect,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "AllBooks.xlsx");
                   }

            }
            
        }
       


    }
}

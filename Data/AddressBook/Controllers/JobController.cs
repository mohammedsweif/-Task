using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;
using Inferastructure.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressJob.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IunitOfWork _uow;
        private readonly Ireposatory<Job> _repo;
        public BookDbcontext Context { get; set; }
        public JobController(IunitOfWork uow, Ireposatory<Job> repo, BookDbcontext _Context)
        {
            _uow = uow;
            _repo = repo;
            Context = _Context;
        }
        [HttpGet]
        [Route("AllJobs")]
        public IActionResult AllDepartment()
        {
            return Ok(_repo.Get().ToList());
        }
        [HttpPost]
        [Route("AddJob")]
        public IActionResult AddJob(Job entity)
        {
            if (ModelState.IsValid)
            {
                _repo.Add(entity);
                _uow.Commit();
                return Ok();
            }
            return BadRequest("the data is not valid");


        }
        [HttpPut]
        [Route("UpdateJob")]
        public IActionResult UpdateJob(Job entity)
        {
            if (ModelState.IsValid)
            {
                Job job = _repo.Get().FirstOrDefault(e => e.Id == entity.Id);
                job.Jobtitle = entity.Jobtitle;
                _uow.Commit();
              
                 
                return Ok(entity);
            }
            return BadRequest("Not found before");

        }
        [HttpDelete]
        [Route("DeleteJob/{id}")]
        public IActionResult DeleteJob(int id)
        {
            Job book = _repo.Get().FirstOrDefault(e => e.Id == id);
            if (book != null)
            {
                _repo.Delete(book);
                _uow.Commit();
                return Ok();
            }
            return BadRequest("Not found before");

        }



    }
}

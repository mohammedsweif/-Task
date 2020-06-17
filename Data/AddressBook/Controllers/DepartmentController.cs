using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;
using Inferastructure.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IunitOfWork _uow;
        private readonly Ireposatory<Department> _repo;
        public DepartmentController(IunitOfWork uow, Ireposatory<Department> repo)
        {
            _uow = uow;
            _repo = repo;
        }
        [HttpGet]
        [Route("AllDepartments")]
        public IActionResult AllDepartment()
        {
            return Ok(_repo.Get().ToList());
        }
        [HttpPost]
        [Route("AddDepartment")]
        public IActionResult AddDepartment(Department entity)
        {
            if(ModelState.IsValid)
            {
                _repo.Add(entity);
            _uow.Commit();
            return Ok();
            }
            return BadRequest("the data is not valid");


        }
        [HttpPut]
        [Route("UpdateDepartment")]
        public IActionResult UpdateDepartment(Department entity)
        {

            if (ModelState.IsValid)
            {
                Department dep = _repo.Get().FirstOrDefault(e => e.Id == entity.Id);
                dep.DepName = entity.DepName;
                //_repo.Update(entity);
                _uow.Commit();
                return Ok();
            }
            return BadRequest("Not found before");

        }
        [HttpDelete]
        [Route("DeleteDepartment/{id}")]
        public IActionResult DeleteDepartment(int id)
        {
            Department dep = _repo.Get().FirstOrDefault(e => e.Id == id); 
            if (dep != null)
            {
                _repo.Delete(dep);
                _uow.Commit();
                return Ok();
            }
            return BadRequest("Not found before");

        }

    }
}

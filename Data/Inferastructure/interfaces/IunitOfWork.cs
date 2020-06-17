using Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Inferastructure.interfaces
{
    public interface IunitOfWork : IDisposable
   {
       BookDbcontext Context { get; }
       void Commit();
   } 
 

}

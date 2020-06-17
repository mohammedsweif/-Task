using Data.Models;
using Inferastructure.interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Inferastructure.services
{
    public class UnitOfWork :IunitOfWork
    {
        public BookDbcontext Context { get; }

        public UnitOfWork(BookDbcontext context)
        {
            Context = context;
        }
        public void Commit()
        {
            Context.SaveChanges();
        }

        public void Dispose()
        {
            Context.Dispose();

        }

    }
}

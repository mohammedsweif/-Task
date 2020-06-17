using Inferastructure.interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Inferastructure.services
{
    public class GeneralReposatory<T> : Ireposatory<T> where T : class
    {
        private readonly IunitOfWork _unitOfWork;
        private readonly DbSet<T> _dbset;
        public GeneralReposatory(IunitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
      _dbset = _unitOfWork.Context.Set<T>();
    }
        public void Add(T entity)
        {
      

      _dbset.Add(entity);
        }

        public void Delete(T entity)
        {
      _dbset.Remove(entity);
        }

    

    public IEnumerable<T> Get()
        {
            return _dbset.AsEnumerable<T>();
        }
 

    public void Update(T entity)
        {
            _unitOfWork.Context.Entry(entity).State = EntityState.Modified;
            _unitOfWork.Context.Set<T>().Attach(entity);
        }
    }
}

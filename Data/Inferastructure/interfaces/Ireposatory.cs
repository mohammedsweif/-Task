using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Inferastructure.interfaces
{
     
    public interface Ireposatory<T> where T:class
    {
        IEnumerable<T> Get();
     // IEnumerable<T> Get(Expression<Func<T, bool>> predicate);
    void Add(T entity);
        void Delete(T entity);
        void Update(T entity);
    } 
     
}

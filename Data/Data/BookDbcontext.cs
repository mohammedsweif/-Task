using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Models
{
   public class BookDbcontext: IdentityDbContext<IdentityUser>
    {
        public BookDbcontext(DbContextOptions<BookDbcontext> options):base(options){}
       
        public virtual List<Book> Books { get; set; }
        public virtual List<Job> Jobs { get; set; }
        public virtual List<Department> Departments { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Department>().HasData(
                new Department
                {
                    Id = 1,
                    DepName = "depOne",

                },
                new Department
                {
                    Id = 2,
                    DepName = "depTwo",

                },
                new Department
                {
                    Id = 3,
                    DepName = "depThree",

                });
            modelBuilder.Entity<Job>().HasData(
               new Job
               {
                   Id = 1,
                   Jobtitle = "Manger",

               }, new Job
               {
                   Id = 2,
                   Jobtitle = "Supervisor",
               }, new Job
               {
                   Id = 3,
                   Jobtitle = "OfficeBoy",
               });

        }
    }
}

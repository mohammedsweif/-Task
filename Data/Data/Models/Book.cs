using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data.Models
{
   public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required,MaxLength(50)]
        public string FullName { get; set; }
        [ForeignKey("job")]
        public int JobTitle { get; set; }
        [ForeignKey("department")]
        public int DepartmentId { get; set; }
        [Required, MaxLength(12)]

        public string Mobile { get; set; }
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        [Required, MaxLength(150)]

        public string Address { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
         
        public string  Photo { get; set; }
        public virtual Department department { get; set; }
        public virtual Job job { get; set; }

    }
}

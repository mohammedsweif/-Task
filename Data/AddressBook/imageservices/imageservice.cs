using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBook.imageservices 
{
    public class imageservice
    {

        
             
           
            public static string ConvertImage(string ImageUrl, IWebHostEnvironment environment)
            {

                string ImageProcess = ImageUrl.Split("base64,")[1];
                byte[] by = Convert.FromBase64String(ImageProcess);

                ImageConverter imageConverter = new ImageConverter();
                Image image = (Image)imageConverter.ConvertFrom(by);
                string extension = ".png";
                string Name = Guid.NewGuid().ToString() + extension;
                string fullpath = Path.Combine(environment.WebRootPath, "images", Name);
                image.Save(fullpath);
                return Name;
            }
            public static string Process(string Image, IHttpContextAccessor contextAccessor)
            {
                //get domain name;
                var request = contextAccessor.HttpContext.Request;
                //make path for Image   
                string path = $"{request.Scheme}://{request.Host.Value}/images/{Image}";
                return path;
            }
        
    }
}

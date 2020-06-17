using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Inferastructure.EmailService
{
    public class SendEmail
    {
        public static bool Excute(string EmailTo, string Subject, string Body)
        {

            try
            {
                MailMessage mm = new MailMessage();
                mm.To.Add(EmailTo);
                mm.Subject = Subject;
                mm.Body = Body;
                mm.From = new MailAddress("sweif4949@gmail.com");
                mm.IsBodyHtml = true;
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
                smtpClient.Port = 587;
                smtpClient.UseDefaultCredentials = true;
                smtpClient.EnableSsl = true;
                //enter email and password
                smtpClient.Credentials = new NetworkCredential("finalpro57@gmail.com", "ITIfinal");
                smtpClient.Send(mm);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}

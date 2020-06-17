using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Data.Models;
using Data.Models.Auth;
using Inferastructure.EmailService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AddressBook.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<IdentityUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly SignInManager<IdentityUser> signInManager;
        BookDbcontext db;

        public AccountController(UserManager<IdentityUser> _userManager,
                                 RoleManager<IdentityRole> _roleManager,
                                 SignInManager<IdentityUser> _signInManager,
                                 BookDbcontext _db)
        {
            userManager = _userManager;
            roleManager = _roleManager;
            signInManager = _signInManager;
            db = _db;
        }

        [HttpPost]
        [Route("Register")]
        // http://localhost:50565/account/Register
        /*
             *  
            Content-Type: application/json; 

          {
            "UserName":"mohadffrefrfmmed",
            "Email":"a@a.a",
            "Password":"123+Aa",
            "ConfirmPassword":"123+Aa"
} 
             */
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (EmailExsist(model.Email))
                {
                    return BadRequest("Email has been register before");
                }
                if(userManager.Users.Count() == 0)
                {
                 //   startapp();
                }

                IdentityUser user = new IdentityUser
                {
                    UserName = model.UserName,
                    Email = model.Email
                };
                var result = await userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    
                    //    await userManager.AddToRoleAsync(user, "user");
                    
                       
                    
                    var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmation = Url.Action("registerationconfirm", "Account", new
                    {
                        Id = user.Id,
                        Token = HttpUtility.UrlEncode(token)
                    }, Request.Scheme);
                    string Subject = "Tamweely Confirmation";
                    string Body = "hi " + user.UserName + "please press here to confirm" + "<a href=" + confirmation + ">Confirm</a>";
                    if (SendEmail.Excute(user.Email, Subject, Body))
                    {
                        return Ok();

                    }
                }
            }
            return NotFound("check your data again");
        }
        /***************************************************************************/
        public bool EmailExsist(string Email)
        {
            if (db.Users.FirstOrDefault(x => x.Email == Email) != null)
                return true;
            return false;
        }
        /**************************************************************************/
        [HttpGet]
        [Route("registerationconfirm")]
        public async Task<IActionResult> registerationconfirm(string Id, string Token)
        {
            if (string.IsNullOrEmpty(Id) || string.IsNullOrEmpty(Token))
            {
                return NotFound();
            }
            var user = await userManager.FindByIdAsync(Id);
            if (user == null)
                return NotFound();
            var result = await userManager.ConfirmEmailAsync(user, HttpUtility.UrlDecode(Token));
            if (result.Succeeded)
            {
                return Ok("has been confirmed");
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }




        /*********************************************************************************/
        [HttpPost]
        [Route("Login")]
        // http://localhost:50565/account/Login
        /*
 
            Content-Type: application/json; charset=utf-8

          {
             
            "Email":"sweif49@gmail.com",
            "Password":"123+Aa",
            "RemmberMe":true
           } 
             */
        public async Task<IActionResult> login(LoginViewModel model)

        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(model.Email);

                if (user != null)
                {
                    if (!user.EmailConfirmed)
                    {
                        return Unauthorized("please check your email before ");
                    }
                    var result = await signInManager.PasswordSignInAsync(user.UserName, model.Password, model.RemmberMe, true);
                    if (result.Succeeded)
                    {
                        var role = await userManager.GetRolesAsync(user);
                         
                        var claims = new List<Claim>
                        {
                            new Claim(JwtRegisteredClaimNames.Sub,user.UserName),
                            new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                         

                        };
                        if (role != null)
                        {
                            foreach (string r in role)
                            {
                                claims.Add(new Claim(ClaimTypes.Role, r));
                            }

                        }
                        var signinkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mohammedmohammedsweif"));
                        var token = new JwtSecurityToken
                        (
                            issuer: "http://oec.com",
                            audience: "http://oec.com",
                            expires: DateTime.UtcNow.AddHours(1)
                            , claims: claims,
                            signingCredentials: new SigningCredentials(signinkey, SecurityAlgorithms.HmacSha256)
                        );


                        return Ok(
                            new
                            {
                                token = new JwtSecurityTokenHandler().WriteToken(token),
                                expiration = token.ValidTo,
                                role = role,
                                username = user.UserName,
                                id = user.Id
                            }
                            );
                    }
                    else if (result.IsLockedOut)
                    {
                        return Unauthorized("you can try after one minute");
                    }
                    else
                    {
                        return Unauthorized("email or password is not correct");
                    }
                }
                else
                {
                    return NotFound("sorry it is not found");
                }
            }
            else
            {
                return NotFound("data is not valid please check your email or password");
            }
        }
        
        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> logoutAsync()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }


      
        public async void startapp()
        {
            await CreateAdmin();
            await CreateRoleuser();
             
        }

        public async Task CreateAdmin()
        {
            IdentityUser admin = new IdentityUser
            {
                Email = "a@a.a",
                EmailConfirmed = true,
                UserName = "Admin",
                
            };
            var result = await userManager.CreateAsync(admin, "123+Aa");
            if (result.Succeeded)
            {
                await CreateRoleAdmin(admin);
            }
        }

        public async Task CreateRoleAdmin(IdentityUser user)
        {
            var x = await roleManager.FindByNameAsync("Admin");
            if (x == null)
            {
                IdentityRole r = new IdentityRole("Admin");
                await roleManager.CreateAsync(r);
            }
            await userManager.AddToRoleAsync(user, "Admin");
        }
        public async Task CreateRoleuser()
        {
            var x = await roleManager.FindByNameAsync("user");
            if (x == null)
            {
                IdentityRole r = new IdentityRole("user");
                var result = await roleManager.CreateAsync(r);
            }
        }
       

     



    }
}

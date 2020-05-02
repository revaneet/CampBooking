using Microsoft.Owin.Security.OAuth;
using Services;
using Shared.DTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace CampBooking
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        UserService userService = new UserService();

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var form = await context.Request.ReadFormAsync();
            var email = form["email"];
            var password = form["password"];

            try
            {
                UserDTO userDTO = userService.GetUser(email, password);
                if (userDTO != null)
                {
                    var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                    identity.AddClaim(new Claim("Email", userDTO.Email));
                    identity.AddClaim(new Claim("FullName", userDTO.FullName));
                    identity.AddClaim(new Claim("UserType", userDTO.IsAdmin ? "Admin" : "User"));
                    identity.AddClaim(new Claim("ID", userDTO.ID.ToString()));
                    context.Validated(identity);

                }
                else
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }
                    
            }
            catch(Exception e)
            {
                throw e;
            }

        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
    }
}
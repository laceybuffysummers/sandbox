namespace Company.Common.Auth.Utils
{
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.IdentityModel.Tokens;

    internal static class CryptoUtils
    {
        public static SymmetricSecurityKey CreateSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
        }

        public static string CreateToken(IdentityUser user)
        {
            var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Id)
                        };

            var signingKey = CreateSecurityKey();
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
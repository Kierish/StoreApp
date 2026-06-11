using Application.DTOs.Auth;
using Domain.Constants;
using Domain.Models.Auth;

namespace Application.Mappers.Auth
{
    public static class UserApplicationMappers
    {
        public static ApplicationUser ToEntity(this RegisterDataDto dto, string hashedPassword)
        {
            return new ApplicationUser
            {
                UserName = dto.UserName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                PasswordHash = hashedPassword,
                Role = UserRoles.Customer,
            };
        }

        public static UserReadDto ToReadDto(this ApplicationUser user)
        {
            return new UserReadDto(
                user.Id,
                user.UserName,
                user.Email,
                user.Role
            );
        }
    }
}

using Application.DTOs.Auth;
using Domain.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IUserService
    {
        Task<Result<IEnumerable<UserReadDto>>> GetAllUsersAsync();
        Task<Result<bool>> ChangeUserRoleAsync(Guid userId, ChangeRoleDto dto);
    }
}

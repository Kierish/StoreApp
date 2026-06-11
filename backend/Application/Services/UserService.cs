using Application.DTOs.Auth;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Mappers.Auth;
using Domain.ErrorMessages;
using Domain.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }
        public async Task<Result<IEnumerable<UserReadDto>>> GetAllUsersAsync()
        {
            var users = await _repo.GetAllUsersAsync();

            var dtos = users.Select(u => u.ToReadDto());

            return Result<IEnumerable<UserReadDto>>.Success(dtos);
        }

        public async Task<Result<bool>> ChangeUserRoleAsync(Guid userId, ChangeRoleDto dto)
        {
            var user = await _repo.GetUserByIdAsync(userId);

            if (user is null)
                return Result<bool>.Failure(UserErrors.UserNotFound(userId));

            user.Role = dto.NewRole;
            await _repo.SaveChangesAsync();

            return Result<bool>.Success(true);
        }
    }
}

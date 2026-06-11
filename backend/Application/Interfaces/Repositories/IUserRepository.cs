using Domain.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<ApplicationUser?> GetUserByIdAsync(Guid id);
        Task<List<ApplicationUser>> GetAllUsersAsync();
        Task SaveChangesAsync();
    }
}

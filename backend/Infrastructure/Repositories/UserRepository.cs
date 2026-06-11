using Application.Interfaces.Repositories;
using Domain.Models.Auth;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ApplicationUser?> GetUserByIdAsync(Guid id) =>
            await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

        public async Task<List<ApplicationUser>> GetAllUsersAsync() =>
            await _context.Users.AsNoTracking().ToListAsync();

        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
    }
}

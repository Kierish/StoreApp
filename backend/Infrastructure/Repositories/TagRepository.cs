using Application.Interfaces.Repositories;
using Domain.Models.Products;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly AppDbContext _context;

        public TagRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Tag>> GetAllTagsAsync()
        {
            return await _context.Tags
                .AsNoTracking()
                .ToListAsync();
        }
    }
}

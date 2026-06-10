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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories
                .AsNoTracking() 
                .ToListAsync();
        }
    }
}

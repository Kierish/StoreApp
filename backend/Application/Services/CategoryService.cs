using Application.DTOs.Products;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Mappers.Products;
using Domain.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;

        public CategoryService(ICategoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<IEnumerable<CategoryReadDto>>> GetAllCategoriesAsync()
        {
            var categories = await _repo.GetAllCategoriesAsync();

            var dtos = categories.Select(c => c.ToReadDto());

            return Result<IEnumerable<CategoryReadDto>>.Success(dtos);
        }
    }
}

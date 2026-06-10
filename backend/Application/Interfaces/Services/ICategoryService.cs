using Application.DTOs.Products;
using Domain.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<Result<IEnumerable<CategoryReadDto>>> GetAllCategoriesAsync();
    }
}

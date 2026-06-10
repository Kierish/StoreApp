using Application.DTOs.Products;
using Domain.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappers.Products
{
    public static class CategoryMappers
    {
        public static CategoryReadDto ToReadDto(this Category category)
        {
            return new CategoryReadDto(
                category.Id,
                category.Name
            );
        }   
    }
}

using Application.DTOs.Products;
using Domain.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappers.Products
{
    public static class TagMappers
    {
        public static TagReadDto ToReadDto(this Tag tag)
        {
            return new TagReadDto(
                tag.Id,
                tag.Name
            );
        }
    }
}

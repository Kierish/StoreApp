using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Products
{
    /// <summary>
    /// Represents a category returned by the API.
    /// </summary>
    /// <param name="Id">The unique identifier of the category.</param>
    /// <param name="Name">The name of the category.</param>
    public record CategoryReadDto(
        Guid Id,
        string Name
    );
}

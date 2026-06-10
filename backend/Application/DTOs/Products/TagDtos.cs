using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Products
{
    /// <summary>
    /// Represents a tag returned by the API.
    /// </summary>
    /// <param name="Id">The unique identifier of the tag.</param>
    /// <param name="Name">The name of the tag.</param>
    public record TagReadDto(
        Guid Id,
        string Name
    );
}

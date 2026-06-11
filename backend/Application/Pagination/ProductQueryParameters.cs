using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Pagination
{
    public record ProductQueryParameters : PageParameters
    {
        public string? CategoryName { get; init; }
        public List<string>? TagNames { get; init; } 
        public decimal? MinPrice { get; init; }
        public decimal? MaxPrice { get; init; }
    }
}

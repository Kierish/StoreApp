using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models.Products
{
    public class PageMetaData
    {
        public required string MetaTitle { get; set; }
        public string? MetaDescription { get; set; }
        public string? Slug { get; set; }
        public string? OpenGraphImageUrl { get; set; }
    }
}

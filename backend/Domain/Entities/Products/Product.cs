using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Models.Products
{
    public class Product : ISoftDelete
    {
        public Guid Id { get; set; } = Guid.CreateVersion7();
        public required string Name { get; set; }
        public ICollection<Tag>? Tags { get; set; } = new HashSet<Tag>();
        public required Guid CategoryId { get; set; }
        public Category? Category { get; set; }
        public required decimal Price { get; set; }
        public PageMetaData? MetaData { get; set; }
        public ICollection<Comment> Comments { get; set; } = new HashSet<Comment>();

        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
    }
}

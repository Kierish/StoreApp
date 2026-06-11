using Domain.Interfaces;
using Domain.Models.Auth;
using Domain.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Comment : ISoftDelete
    {
        public Guid Id { get; set; } = Guid.CreateVersion7();
        public required string Text { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public required Guid ProductId { get; set; }
        public Product? Product { get; set; }

        public required Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }

        public bool IsDeleted { get; set; } = false;
        public DateTime? DeletedAt { get; set; }
    }
}

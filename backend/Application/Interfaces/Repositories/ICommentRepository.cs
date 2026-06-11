using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetCommentsByProductIdAsync(Guid productId);
        Task<Comment?> GetCommentByIdAsync(Guid id);
        void AddComment(Comment comment);
        void RemoveComment(Comment comment);
        Task SaveChangesAsync();
    }
}

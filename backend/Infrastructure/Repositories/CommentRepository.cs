using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;

        public CommentRepository(AppDbContext context) => _context = context;

        public async Task<List<Comment>> GetCommentsByProductIdAsync(Guid productId)
        {
            return await _context.Comments
                .Include(c => c.User) 
                .Where(c => c.ProductId == productId)
                .OrderByDescending(c => c.CreatedAt) 
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Comment?> GetCommentByIdAsync(Guid id) =>
            await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);

        public void AddComment(Comment comment) => _context.Comments.Add(comment);

        public void RemoveComment(Comment comment)
        {
            comment.IsDeleted = true;
            comment.DeletedAt = DateTime.UtcNow;
        }

        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
    }
}

using Domain.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface ITagRepository
    {
        Task<List<Tag>> GetAllTagsAsync();
    }
}

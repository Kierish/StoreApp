using Application.DTOs.Products;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Mappers.Products;
using Domain.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _repo;

        public TagService(ITagRepository repo)
        {
            _repo = repo;
        }

        public async Task<Result<IEnumerable<TagReadDto>>> GetAllTagsAsync()
        {
            var tags = await _repo.GetAllTagsAsync();
            var dtos = tags.Select(t => t.ToReadDto());
            return Result<IEnumerable<TagReadDto>>.Success(dtos);
        }
    }
}

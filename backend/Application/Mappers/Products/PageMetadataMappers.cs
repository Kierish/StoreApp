using Application.DTOs.Products;
using Domain.Models.Products;

namespace Application.Mappers.Products
{
    public static class PageMetadataMappers
    {
        public static PageMetaData? ToEntity(this PageMetadataCreateDto metaDataDto)
        {
            if (metaDataDto == null)
                return null;

            return new PageMetaData
            {
                MetaTitle = metaDataDto.MetaTitle,
                MetaDescription = metaDataDto.MetaDescription,
                Slug = metaDataDto.Slug,
                OpenGraphImageUrl = metaDataDto.OpenGraphImageUrl,
            };
        }

        public static PageMetaData ToEntity(this PageMetadataUpdateDto metaDataDto)
        {
            return new PageMetaData
            {
                MetaTitle = metaDataDto.MetaTitle ?? "",
                MetaDescription = metaDataDto.MetaDescription,
                Slug = metaDataDto.Slug,
                OpenGraphImageUrl = metaDataDto.OpenGraphImageUrl,
            };
        }

        public static void MapToEntity(this PageMetadataUpdateDto metaDataDto, PageMetaData existingMetaData)
        {
            existingMetaData.MetaTitle = metaDataDto.MetaTitle ?? existingMetaData.MetaTitle;
            existingMetaData.MetaDescription = metaDataDto.MetaDescription ?? existingMetaData.MetaDescription;
            existingMetaData.Slug = metaDataDto.Slug ?? existingMetaData.Slug;
            existingMetaData.OpenGraphImageUrl =
                metaDataDto.OpenGraphImageUrl ?? existingMetaData.OpenGraphImageUrl;
        }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Products
{
    /// <summary>
    /// Represents metadata associated with a product.
    /// </summary>
    /// <param name="MetaTitle">The meta title for the product.</param>
    /// <param name="MetaDescription">The meta description for the product.</param>
    /// <param name="Slug">The URL-friendly identifier for the product.</param>
    /// <param name="OpenGraphImageUrl">The URL pointing to the Open Graph image.</param>
    public record PageMetadataReadDto(
        string MetaTitle,
        string? MetaDescription,
        string? Slug,
        string? OpenGraphImageUrl
    );

    /// <summary>
    /// Contains metadata for creating a product.
    /// </summary>
    /// <param name="MetaTitle">The meta title for the product.</param>
    /// <param name="MetaDescription">The meta description for the product.</param>
    /// <param name="Slug">The URL-friendly identifier for the product.</param>
    /// <param name="OpenGraphImageUrl">The URL pointing to the Open Graph image.</param>
    public record PageMetadataCreateDto(
        string MetaTitle,
        string? MetaDescription,
        string? Slug,
        string? OpenGraphImageUrl
    );

    /// <summary>
    /// Contains metadata to update for a product.
    /// </summary>
    /// <param name="MetaTitle">The updated meta title.</param>
    /// <param name="MetaDescription">The updated meta description.</param>
    /// <param name="Slug">The updated URL-friendly identifier.</param>
    /// <param name="OpenGraphImageUrl">The updated URL pointing to the Open Graph image.</param>
    public record PageMetadataUpdateDto(
        string? MetaTitle,
        string? MetaDescription,
        string? Slug,
        string? OpenGraphImageUrl
    );
}

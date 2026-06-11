namespace Application.Pagination
{
    public record PageParameters
    {
        public int Page { get; init; } = 1;
        public int PageSize { get; init; } = 5;
    }
}

namespace Company.Common.Services.Models.Interfaces
{
    public interface ISortable
    {
        string SortBy { get; }

        bool Desc { get; }
    }
}
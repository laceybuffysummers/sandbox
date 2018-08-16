namespace Company.Common.Domain.Interfaces
{
    public interface IIdEntity<out TId>
    {
        TId Id { get; }
    }
}
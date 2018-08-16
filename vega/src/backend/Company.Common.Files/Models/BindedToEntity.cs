namespace Company.Common.Files.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public sealed class BindedToEntity
    {
        public BindedToEntity(
            string entity,
            string entityId,
            IEnumerable<BindedItem> items)
        {
            this.Entity = entity;
            this.EntityId = entityId;
            this.Items = items;
        }

        [Required]
        public string Entity { get; }

        [Required]
        public string EntityId { get; }

        public IEnumerable<BindedItem> Items { get; }
    }
}
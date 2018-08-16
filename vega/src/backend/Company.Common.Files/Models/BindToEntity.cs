namespace Company.Common.Files.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public sealed class BindToEntity
    {
        public BindToEntity(
            string entity, 
            string entityId, 
            IEnumerable<BindItem> items)
        {
            this.Entity = entity;
            this.EntityId = entityId;
            this.Items = items;
        }

        [Required]
        public string Entity { get; }

        [Required]
        public string EntityId { get; }

        public IEnumerable<BindItem> Items { get; }
    }
}
namespace Company.Common.Files.Resources
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public sealed class BindToEntityResource
    {
        public BindToEntityResource()
        {            
        }

        public BindToEntityResource(
            string entity,
            string entityId,
            IEnumerable<BindItemResource> items)
        {
            this.Entity = entity;
            this.EntityId = entityId;
            this.Items = items;
        }

        [Required]
        public string Entity { get; set; }

        [Required]
        public string EntityId { get; set; }

        public IEnumerable<BindItemResource> Items { get; set; }
    }
}
namespace Company.Common.Files.Resources
{
    using System.ComponentModel.DataAnnotations;

    public sealed class BindedItemResource
    {
        public BindedItemResource()
        {            
        }

        public BindedItemResource(string fileName)
        {
            this.FileName = fileName;
        }

        [Required]
        [MaxLength(255)]
        public string FileName { get; set; }
    }
}
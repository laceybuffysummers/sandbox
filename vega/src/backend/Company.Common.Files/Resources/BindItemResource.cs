namespace Company.Common.Files.Resources
{
    using System.ComponentModel.DataAnnotations;

    public sealed class BindItemResource
    {
        public BindItemResource()
        {            
        }

        public BindItemResource(string fileName)
        {
            this.FileName = fileName;
        }

        [Required]
        [MaxLength(255)]
        public string FileName { get; set; }
    }
}
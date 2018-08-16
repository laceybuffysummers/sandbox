namespace Company.Common.Files.Models
{
    using System.ComponentModel.DataAnnotations;

    public sealed class BindedItem
    {
        public BindedItem(string fileName)
        {
            this.FileName = fileName;
        }

        [Required]
        [MaxLength(255)]
        public string FileName { get; }
    }
}
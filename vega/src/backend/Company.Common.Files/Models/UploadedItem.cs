namespace Company.Common.Files.Models
{
    using System.ComponentModel.DataAnnotations;

    public sealed class UploadedItem
    {
        public UploadedItem(
            string fileName, 
            string originalFileName, 
            string mimeType)
        {
            this.FileName = fileName;
            this.OriginalFileName = originalFileName;
            this.MimeType = mimeType;
        }

        [Required]
        [MaxLength(255)]
        public string FileName { get; }

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; }

        [Required]
        [MaxLength(255)]
        public string MimeType { get; }
    }
}
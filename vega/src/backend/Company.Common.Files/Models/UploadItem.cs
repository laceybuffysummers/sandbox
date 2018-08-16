namespace Company.Common.Files.Models
{
    using System.ComponentModel.DataAnnotations;

    public sealed class UploadItem
    {
        public UploadItem(
            string originalFileName, 
            string mimeType, 
            byte[] file)
        {
            this.OriginalFileName = originalFileName;
            this.MimeType = mimeType;
            this.File = file;
        }

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; }

        [Required]
        [MaxLength(255)]
        public string MimeType { get; }

        public byte[] File { get; }
    }
}
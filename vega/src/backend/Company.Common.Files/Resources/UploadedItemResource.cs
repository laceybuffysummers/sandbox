namespace Company.Common.Files.Resources
{
    using System.ComponentModel.DataAnnotations;

    public sealed class UploadedItemResource
    {
        public UploadedItemResource()
        {            
        }

        public UploadedItemResource(
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
        public string FileName { get; set; }

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; set; }

        [Required]
        [MaxLength(255)]
        public string MimeType { get; set; }
    }
}
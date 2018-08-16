namespace Company.Common.Files.Models
{
    using System.ComponentModel.DataAnnotations;

    public sealed class DownloadFile
    {
        public DownloadFile(
            string entity,
            string entityId,
            string fileName,
            string originalFileName,
            string mimeType)
        {
            this.Entity = entity;
            this.EntityId = entityId;
            this.FileName = fileName;
            this.OriginalFileName = originalFileName;
            this.MimeType = mimeType;
        }

        public string Entity { get; }

        public string EntityId { get; }

        [Required]
        [MaxLength(255)]
        public string FileName { get; }

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; set; }

        [Required]
        [MaxLength(255)]
        public string MimeType { get; }
    }
}
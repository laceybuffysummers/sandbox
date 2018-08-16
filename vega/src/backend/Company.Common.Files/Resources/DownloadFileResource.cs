namespace Company.Common.Files.Resources
{
    using System.ComponentModel.DataAnnotations;

    public sealed class DownloadFileResource
    {
        public DownloadFileResource()
        {            
        }

        public DownloadFileResource(
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

        public string Entity { get; set; }

        public string EntityId { get; set; }

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
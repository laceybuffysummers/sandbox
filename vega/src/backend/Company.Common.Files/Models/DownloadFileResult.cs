namespace Company.Common.Files.Models
{
    using System.ComponentModel.DataAnnotations;

    public sealed class DownloadFileResult
    {
        public DownloadFileResult(
            byte[] file,
            string originalFileName,
            string mimeType)
        {
            this.File = file;
            this.OriginalFileName = originalFileName;
            this.MimeType = mimeType;
        }

        public byte[] File { get; }

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; }

        [Required]
        [MaxLength(255)]
        public string MimeType { get; }
    }
}
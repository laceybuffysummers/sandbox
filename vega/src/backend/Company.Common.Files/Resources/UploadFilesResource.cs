namespace Company.Common.Files.Resources
{
    using System.Collections.Generic;

    public sealed class UploadFilesResource
    {
        public UploadFilesResource()
        {            
        }

        public UploadFilesResource(
            IEnumerable<UploadItemResource> items)
        {
            this.Items = items;
        }

        public IEnumerable<UploadItemResource> Items { get; set; }
    }
}
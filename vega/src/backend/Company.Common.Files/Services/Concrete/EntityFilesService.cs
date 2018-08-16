namespace Company.Common.Files.Services.Concrete
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    using AutoMapper;

    using Company.Common.Files.Models;

    public class EntityFilesService : IEntityFilesService
    {
        protected readonly string UploadFolder;

        protected readonly IMapper Mapper;

        private const string Temp = "__TEMP__";

        public EntityFilesService(
            string uploadFolder,
            IMapper mapper)
        {
            this.UploadFolder = uploadFolder;
            this.Mapper = mapper;
        }

        public virtual async Task<UploadedFiles> Upload(UploadFiles uploadFiles)
        {
            var uploadFolder = Path.Combine(this.UploadFolder, Temp);
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var uploadedItems = new List<UploadedItem>();
            foreach (var uploadItem in uploadFiles.Items)
            {
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(uploadItem.OriginalFileName)}";
                using (var fs = new FileStream(
                    Path.Combine(uploadFolder, fileName),
                    FileMode.CreateNew))
                {
                    await fs.WriteAsync(uploadItem.File, 0, uploadItem.File.Length);
                    uploadedItems.Add(new UploadedItem(
                        fileName,
                        uploadItem.OriginalFileName,
                        uploadItem.MimeType));
                }
            }

            return new UploadedFiles(uploadedItems);
        }

        public virtual async Task<BindedToEntity> Bind(BindToEntity bindToEntity)
        {
            var uploadFolder = Path.Combine(this.UploadFolder, Temp);
            var bindFolder = Path.Combine(this.UploadFolder, bindToEntity.Entity, bindToEntity.EntityId);
            if (!Directory.Exists(bindFolder))
            {
                Directory.CreateDirectory(bindFolder);
            }

            var bindedItems = new List<BindedItem>();
            await Task.Run(() =>
            {
                foreach (var item in bindToEntity.Items)
                {
                    File.Move(
                        Path.Combine(uploadFolder, item.FileName),
                        Path.Combine(bindFolder, item.FileName));

                    bindedItems.Add(new BindedItem(item.FileName));
                }
            });

            return new BindedToEntity(
                bindToEntity.Entity,
                bindToEntity.EntityId,
                bindedItems);
        }

        public virtual async Task<DownloadFileResult> Download(DownloadFile downloadFile)
        {
            var downloadPath = string.IsNullOrEmpty(downloadFile.Entity) || 
                string.IsNullOrEmpty(downloadFile.EntityId) ? 
                Path.Combine(this.UploadFolder, Temp, downloadFile.FileName) :
                Path.Combine(this.UploadFolder, downloadFile.Entity, downloadFile.EntityId, downloadFile.FileName);

            using(var fs = new FileStream(downloadPath, FileMode.Open, FileAccess.Read))
            {
                var buffer = new byte[0];
                await fs.ReadAsync(buffer, 0, (int)fs.Length);
                return new DownloadFileResult(buffer, downloadFile.OriginalFileName, downloadFile.MimeType);
            }
        }
    }
}
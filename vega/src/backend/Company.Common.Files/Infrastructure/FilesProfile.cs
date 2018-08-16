namespace Company.Common.Files.Infrastructure
{
    using System.Collections.Generic;

    using AutoMapper;

    using Company.Common.Files.Models;
    using Company.Common.Files.Resources;

    public class FilesProfile : Profile
    {
        public FilesProfile()
        {            
            this.CreateMap<UploadItemResource, UploadItem>()
                .ConstructUsing(
                    r => new UploadItem(
                        r.OriginalFileName,
                        r.MimeType,
                        r.File));

            this.CreateMap<UploadFilesResource, UploadFiles>()
                .ConstructUsing(
                    r => new UploadFiles(
                        Mapper.Map<IEnumerable<UploadItem>>(r.Items)));

            this.CreateMap<UploadedItem, UploadedItemResource>()
                .ConstructUsing(
                    m => new UploadedItemResource(
                        m.FileName,
                        m.OriginalFileName,
                        m.MimeType));

            this.CreateMap<UploadedFiles, UploadedFilesResource>()
                .ConstructUsing(
                    m => new UploadedFilesResource(
                        Mapper.Map<IEnumerable<UploadedItemResource>>(m.Items)));

            this.CreateMap<BindItemResource, BindItem>()
                .ConstructUsing(r => new BindItem(
                    r.FileName));

            this.CreateMap<BindToEntityResource, BindToEntity>()
                .ConstructUsing(
                    r => new BindToEntity(
                        r.Entity,
                        r.EntityId,
                        Mapper.Map<IEnumerable<BindItem>>(r.Items)));

            this.CreateMap<BindedItem, BindedItemResource>()
                .ConstructUsing(
                    m => new BindedItemResource(
                        m.FileName));

            this.CreateMap<BindedToEntity, BindedToEntityResource>()
                .ConstructUsing(
                    m => new BindedToEntityResource(
                        m.Entity,
                        m.EntityId,
                        Mapper.Map<IEnumerable<BindedItemResource>>(m.Items)));

            this.CreateMap<DownloadFileResource, DownloadFile>()
                .ConstructUsing(
                    r => new DownloadFile(
                        r.Entity,
                        r.EntityId,
                        r.FileName,
                        r.OriginalFileName,
                        r.MimeType));
        }
    }
}
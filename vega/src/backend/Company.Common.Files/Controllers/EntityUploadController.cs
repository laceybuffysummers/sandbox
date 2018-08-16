namespace Company.Common.Files.Controllers
{
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Company.Common.Files.Models;
    using Company.Common.Files.Resources;
    using Company.Common.Files.Services;

    using Microsoft.AspNetCore.Mvc;

    [Route("api/v1/files/[action]")]
    public abstract class EntityUploadController : Controller
    {
        protected readonly IEntityFilesService FilesService;

        protected readonly IMapper Mapper;

        protected EntityUploadController(
            IEntityFilesService filesService, 
            IMapper mapper)
        {
            this.FilesService = filesService;
            this.Mapper = mapper;
        }

        [HttpPost]
        public virtual async Task<IActionResult> Upload()
        {
            var uploadItems = this.Request.Form.Files.Select(f => {
                    using (var ms = new MemoryStream())
                    {
                        f.CopyToAsync(ms);
                        return new UploadItem(
                            f.FileName,
                            f.ContentType,
                            ms.GetBuffer());
                    }
                });

            var entityUploaded = await this.FilesService.Upload(new UploadFiles(uploadItems));
            var entityUploadedResource = this.Mapper.Map<UploadedFilesResource>(entityUploaded);

            return this.Ok(entityUploadedResource);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Bind([FromBody] BindToEntityResource bindToEntityResource)
        {
            var bindToEntity = this.Mapper.Map<BindToEntity>(bindToEntityResource);
            var bindedToEntity = await this.FilesService.Bind(bindToEntity);
            var bindedToEntityResource = this.Mapper.Map<BindedToEntityResource>(bindedToEntity);

            return this.Ok(bindedToEntityResource);
        }

        [HttpGet]
        public virtual async Task<IActionResult> Download([FromQuery] DownloadFileResource downloadFileResource)
        {
            var downloadFile = this.Mapper.Map<DownloadFile>(downloadFileResource);
            var downloadFileResult = await this.FilesService.Download(downloadFile);
            return this.File(
                downloadFileResult.File,
                downloadFileResult.MimeType,
                downloadFileResult.OriginalFileName);
        }
    }
}
namespace Company.Common.Files.Services
{
    using System.Threading.Tasks;

    using Company.Common.Files.Models;

    public interface IEntityFilesService
    {
        Task<UploadedFiles> Upload(UploadFiles uploadFiles);

        Task<BindedToEntity> Bind(BindToEntity bindToEntity);

        Task<DownloadFileResult> Download(DownloadFile downloadFile);
    }
}
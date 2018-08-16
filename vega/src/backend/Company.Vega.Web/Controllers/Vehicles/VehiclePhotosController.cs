namespace Company.Vega.Web.Controllers.Vehicles
{
    using AutoMapper;

    using Company.Common.Files.Controllers;
    using Company.Common.Files.Services;

    public sealed class VehiclePhotosController
        : EntityUploadController
    {
        public VehiclePhotosController(IEntityFilesService filesService, IMapper mapper)
            : base(filesService, mapper)
        {
        }
    }
}
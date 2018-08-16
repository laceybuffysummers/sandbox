namespace Company.Vega.Services.Vega.Infrastructure
{
    using System.Collections.Generic;

    using AutoMapper;

    using Company.Vega.Domain.Entities;
    using Company.Vega.Services.Vega.Models.Vehicles.Entity;

    public class VegaProfile : Profile
    {
        public VegaProfile()
        {
            // Entities
            this.CreateMap<PhotoEntity, VehiclePhoto>()
                .ConstructUsing(
                    e => new VehiclePhoto(
                        e.Id,
                        e.FileName,
                        e.OriginalFileName,
                        e.MimeType,
                        e.VehicleId))
                .ReverseMap();

            this.CreateMap<Vehicle, VehicleEntity>()
                .ConstructUsing(
                    m => new VehicleEntity
                        {
                            Id = m.Id,
                            ModelId = m.ModelId,
                            OwnerId = m.OwnerId,
                            Description = m.Description,
                            IsRegistered = m.IsRegistered,
                            Photos = Mapper.Map<ICollection<PhotoEntity>>(m.Photos)
                        });
        }
    }
}
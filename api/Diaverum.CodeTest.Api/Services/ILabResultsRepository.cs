using Diaverum.CodeTest.Api.Entities;

namespace Diaverum.CodeTest.Api.Services;

public interface ILabResultsRepository
{
    IEnumerable<LabResults> FindAll();
    LabResults? FindById(int id);
    
    void Save(LabResults labResults);
}
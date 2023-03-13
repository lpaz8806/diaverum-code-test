using Diaverum.CodeTest.Api.Data;
using Diaverum.CodeTest.Api.Entities;

namespace Diaverum.CodeTest.Api.Services;

public class LabResultsRepository : ILabResultsRepository
{
    private readonly LabResultsContext _context;
    
    public LabResultsRepository(LabResultsContext context)
    {
        _context = context;
    }
    
    public IEnumerable<LabResults> FindAll() => _context.LabResults;

    public LabResults? FindById(int id) => _context.LabResults.Find(id);

    public void Save(LabResults labResults)
    {
        if (labResults.Id == 0)
            _context.LabResults.Add(labResults);
        else
            _context.LabResults.Update(labResults);

        _context.SaveChanges();
    }
}
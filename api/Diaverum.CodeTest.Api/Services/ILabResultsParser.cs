using Diaverum.CodeTest.Api.Entities;

namespace Diaverum.CodeTest.Api.Services;

public interface ILabResultsParser
{
    IEnumerable<LabResults> Parse(string data);
}
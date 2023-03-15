using System.Text;
using Diaverum.CodeTest.Api.Entities;
using Diaverum.CodeTest.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Diaverum.CodeTest.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class LabResultsController : ControllerBase
{
    private readonly ILabResultsParser _parser;
    private readonly ILabResultsRepository _repository;
    
    public LabResultsController(ILabResultsRepository repository, ILabResultsParser parser)
    {
        _parser = parser;
        _repository = repository;
    }
    
    [HttpGet]
    public ActionResult<IEnumerable<LabResults>> GetResults()
    {
        return Ok(_repository.FindAll());
    }
    
    [HttpGet("{id}")]
    public ActionResult<IEnumerable<LabResults>> GetResultsById(int id)
    {
        var labResults = _repository.FindById(id);
        
        return labResults is null ? NotFound() : Ok(labResults);
    }
    
    [HttpPost]
    public async Task<ActionResult> RegisterResults()
    {
        try
        {
            using var reader = new StreamReader(Request.Body, Encoding.UTF8);
            var rawData = await reader.ReadToEndAsync();
            foreach (var labResults in _parser.Parse(rawData))
                _repository.Save(labResults);
        }
        catch (FormatException e)
        {
            return BadRequest(e.Message);
        }
        
        return CreatedAtAction(nameof(GetResults), "LabResults");
    }
}
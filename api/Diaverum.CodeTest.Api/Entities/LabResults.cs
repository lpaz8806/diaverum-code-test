namespace Diaverum.CodeTest.Api.Entities;

public record LabResults
{
    public int Id { get; set; }
    
    public string ClinicNo { get; init; } = string.Empty;
    public string Barcode { get; init; } = string.Empty;
    
    public string PatientId { get; init; } = string.Empty;
    public string PatientName { get; init; } = string.Empty;
    public string DateOfBirth { get; init; } = string.Empty;
    public string Gender { get; init; } = string.Empty;
    
    public string CollectionDate { get; init; } = string.Empty;
    public string CollectionTime { get; init; } = string.Empty;
    
    public string TestCode { get; init; } = string.Empty;
    public string TestName { get; init; } = string.Empty;
    
    public string Result { get; init; } = string.Empty;
    public string Unit { get; init; } = string.Empty;
    public string RefRangeLow { get; init; } = string.Empty;
    public string RefRangeHigh { get; init; } = string.Empty;
    public string Note { get; init; } = string.Empty;
    public string NonSpecRefs { get; init; } = string.Empty;
}
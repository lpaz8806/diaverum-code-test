using Diaverum.CodeTest.Api.Entities;

namespace Diaverum.CodeTest.Api.Services;

public class LabResultsParser : ILabResultsParser
{
    private readonly CvsParser _parser = new()
    {
        LineCommentToken = "#",
        FieldSeparatorToken = "|",
        Keys = new[]
        {
            "CLINIC_NO", "BARCODE", "PATIENT_ID", "PATIENT_NAME", "DOB", "GENDER", "COLLECTIONDATE", "COLLECTIONTIME",
            "TESTCODE", "TESTNAME", "RESULT", "UNIT", "REFRANGELOW", "REFRANGEHIGH", "NOTE", "NONSPECREFS"
        }
    };

    public IEnumerable<LabResults> Parse(string data)
    {
        var reader = new StringReader(data);
        return _parser.Parse(reader).Select(row => new LabResults
        {
            ClinicNo = row["CLINIC_NO"],
            Barcode = row["BARCODE"],
            
            PatientId = row["PATIENT_ID"],
            PatientName = row["PATIENT_NAME"],
            DateOfBirth = row["DOB"],
            Gender = row["GENDER"],
            
            CollectionDate = row["COLLECTIONDATE"],
            CollectionTime = row["COLLECTIONTIME"],
            
            TestCode = row["TESTCODE"],
            TestName = row["TESTNAME"],
            
            Result = row["RESULT"],
            Unit = row["UNIT"],
            RefRangeLow = row["REFRANGELOW"],
            RefRangeHigh = row["REFRANGEHIGH"],
            Note = row["NOTE"],
            NonSpecRefs = row["NONSPECREFS"],
        });
    }
}

internal class CvsParser
{
    private readonly HashSet<string> _keys = new();
    
    public string LineCommentToken { get; init; } = "#";
    public string FieldSeparatorToken { get; init; } = "|";
    public IEnumerable<string> Keys
    {
        get => _keys;
        init => _keys.UnionWith(value);
    }
    
    public IEnumerable<IDictionary<string, string>> Parse(TextReader data)
    {
        using var linesEnumerator = ReadLines(data).SkipWhile(IsComment).GetEnumerator();

        if (!linesEnumerator.MoveNext())
            throw new FormatException("Expected header line");

        var keys = ReadKeys(linesEnumerator.Current);
        
        CheckValidKeys(keys);
        
        while (linesEnumerator.MoveNext())
        {
            var values = ReadValues(linesEnumerator.Current);
            yield return Merge(keys, values);
        }
    }

    private IEnumerable<string> ReadLines(TextReader data)
    {
        while (data.ReadLine() is { } line)
            yield return line;
    }

    private string[] ReadKeys(string line)
    {
        var keys = line.Split(FieldSeparatorToken, StringSplitOptions.TrimEntries);
        return keys;
    }
    private string[] ReadValues(string line) => line.Split(FieldSeparatorToken, StringSplitOptions.TrimEntries);
    private bool IsComment(string line) => line.StartsWith(LineCommentToken);

    private void CheckValidKeys(string[] keys)
    {
        if(!_keys.IsSupersetOf(keys))
            throw new FormatException(
                "Unexpected keys: " + 
                string.Join(", ", keys.Where(k => !_keys.Contains(k)))
            );
    }
    
    private static IDictionary<string, string> Merge(IReadOnlyList<string> keys, IReadOnlyList<string> values)
    {
        if (keys.Count != values.Count)
            throw new FormatException($"Expected {keys.Count} values, {values.Count} given");
        
        return new Dictionary<string, string>(Enumerable
            .Range(0, keys.Count)
            .Select(i => KeyValuePair.Create(keys[i], values[i])));
    }
}


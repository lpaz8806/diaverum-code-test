import {HttpDataSource} from "./DataSourceBase";

class LabResultsDataSource extends HttpDataSource {
    _buildEndpoint() {
        const baseUrl = process.env.REACT_APP_API_URL;
        return `${baseUrl}/api/v1/labresults`;
    }
}

export default LabResultsDataSource;
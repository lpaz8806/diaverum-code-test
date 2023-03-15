class DataSourceBase {
    _data = [];
    _onError = (eventArgs) => { }
    _onDataFetched = (eventArgs) => { }

    get data() { return this._data; }

    set onError(callback) {
        if(!(callback instanceof Function))
            throw Error("Not a function");

        this._onError = callback;
    }
    set onDataFetched(callback) {
        if(!(callback instanceof Function))
            throw Error("Not a function");

        this._onDataFetched = callback;
    }

    async refresh() { }
}

class HttpDataSource extends DataSourceBase {
    async refresh() {
        try {
            const endpoint = this._buildEndpoint();
            const response = await fetch(endpoint);

            if(response.ok) {
                this._data = await response.json();
                this._onDataFetched(this._data);
                return;
            }

            this._onError({
                status: response.status,
                message: response.statusText
            });

        } catch(e) {
            this._onError({
                status: 0,
                message: "Network error: The remote service is unreachable"
            });
        }
    }

    _buildEndpoint() { return "" }
}

export {
    DataSourceBase,
    HttpDataSource
};
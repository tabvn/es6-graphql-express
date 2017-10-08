import DataLoader from 'dataloader';
import User from './models/user/schema';

class Context {

    constructor(request) {
        this.request = request;
        this.user = request.user;
    }


    indexResults = (results, indexField, cacheKeyFn = key => key) => {
        const indexedResults = new Map();
        results.forEach(res => {
            indexedResults.set(cacheKeyFn(res[indexField]), res);
        });
        return indexedResults;
    };


    cacheKeyFn = (key) => {
        return key.toString()
    };

    normalizeResults = (keys, indexField, cacheKeyFn = key => key) => {
        return results => {
            const indexedResults = this.indexResults(results, indexField, cacheKeyFn);
            return keys.map(
                val => indexedResults.get(cacheKeyFn(val)) || new Error(`Key not found : ${val}`),
            );
        };
    };

    loadUsers = async (keys) => {
        return await User.find({_id: {$in: keys}});
    };

    userLoader = new DataLoader(keys => this.loadUsers(keys), this.cacheKeyFn);

    ensureIsAuthenticated = () => {
        if (!this.user) throw new Error('Anonymous access is denied.');
    };
}

export default Context;
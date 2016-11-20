class QueryHelper {
    constructor(query, options) {
        this.query = query ? query : {};
        this.options = options ? options : {};
    }

    PageByOptions() {
        if(this.options.skip !== null && this.options.take !== null) {
            let skip = parseInt(this.options.skip);
            let take = parseInt(this.options.take);
            skip = isNaN(skip) ? undefined : skip;
            take = isNaN(take) ? undefined : take;
            this.query.offset = skip;
            this.query.limit = take;
        }
        return this;
    }

    SortByOptions() {
        if (this.options.sort) {
            for (let option of this.options.sort) {
                let columnName = option.selector;
                let descending = option.desc;
                this.query.order = this.query.order || [];
                this.query.order.push([
                    columnName, descending ? 'DESC' : 'ASC'
                ])
            }
        }
        return this;
    }

    FilterByOptions() {
        if (this.options.filter) {
            var filterTree = this.options.filter;
            return this.ReadExpression(this.query, filterTree);
        }
        return this;
    }

    ReadExpression(source, array) {
        let isJsonArray = /^\[(.*)\]$/;
        if (!isJsonArray.test(array[0]) && !Array.isArray(array[0])) {
            return this.FilterQuery(source,
                array[0].toString(),
                array[1].toString(),
                array[2].toString());
        } else {
            for (let i = 0; i < array.length; i++) {
                if (array[i] === "and")
                    continue;
                if (array[i] === "or")
                    continue;
                source = this.ReadExpression(source, isJsonArray.test(array[0]) ? JSON.parse(array[i]) : array[i]);
            }
            return source;
        }
    }

    FilterQuery(source, ColumnName, Clause, Value) {
        source.where = source.where || {};
        switch (Clause) {
            case "=":
                source.where[ColumnName] = Value;
                break;
            case "contains":
                source.where[ColumnName] = source.where[ColumnName] || {};
                source.where[ColumnName].$like = `%${Value}%`;
                break;
            case "<>":
                source.where[ColumnName] = source.where[ColumnName] || {};
                source.where[ColumnName].$ne = Value;
                break;
            case ">=":
                source.where[ColumnName] = source.where[ColumnName] || {};
                source.where[ColumnName].$gte = Value;
                break;
            case "<=":
                source.where[ColumnName] = source.where[ColumnName] || {};
                source.where[ColumnName].$lte = Value;
                break;
            case "<":
                source.where[ColumnName] = source.where[ColumnName] || {};
                source.where[ColumnName].$lt = Value;
                break;
            case ">":
                source.where[ColumnName] = source.where[ColumnName] || {};
                source.where[ColumnName].$gt = Value;
                break;
            default:
                break;
        }
        return source;
    }
}
module.exports = QueryHelper;
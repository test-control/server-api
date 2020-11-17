"use strict";
exports.__esModule = true;
exports.SchemasContainer = exports.autoTypesPath = exports.apiSpecPath = void 0;
var path = require('path');
exports.apiSpecPath = path.join(__dirname, '..', 'specs', 'api');
exports.autoTypesPath = path.join(__dirname, '..', 'src', 'auto-types');
var SchemasContainer = /** @class */ (function () {
    function SchemasContainer() {
        this.schemas = {};
    }
    SchemasContainer.prototype.addSchema = function (schema, schemaSubPath) {
        if (!this.schemas[schemaSubPath]) {
            this.schemas[schemaSubPath] = [];
        }
        this.schemas[schemaSubPath].push(schema);
    };
    SchemasContainer.prototype.getSchemas = function () {
        return this.schemas;
    };
    return SchemasContainer;
}());
exports.SchemasContainer = SchemasContainer;

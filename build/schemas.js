"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ifc4_1 = require("./ifc4");
var ifc2x3tc1_1 = require("./ifc2x3tc1");
var Schema = /** @class */ (function () {
    function Schema() {
        this.ifc2x3 = ifc2x3tc1_1.ifc2x3tc1;
        this.ifc4 = ifc4_1.ifc4;
        this.addSubtypesToSchema(this.ifc2x3);
        this.addSubtypesToSchema(this.ifc4);
    }
    Schema.prototype.isA = function (schema, typeSubject, typeName) {
        var _this = this;
        var isa = false;
        if (typeSubject == typeName) {
            return true;
        }
        var currentSchema = this[schema];
        var subject = currentSchema.classes[typeSubject];
        if (subject == null) {
            console.log(typeSubject, "not found");
        }
        if (!subject.superclasses) {
            subject.superclasses = [];
        }
        subject.superclasses.some(function (superclass) {
            if (superclass == typeName) {
                isa = true;
                return true;
            }
            if (_this.isA(schema, superclass, typeName)) {
                isa = true;
                return true;
            }
            return false;
        });
        return isa;
    };
    Schema.prototype.addSubtypesToSchema = function (schemaDef) {
        var _loop_1 = function (typeName) {
            var type = schemaDef.classes[typeName];
            if (type.superclasses) {
                type.superclasses.forEach(function (superClass) {
                    var directSubClasses = schemaDef.classes[superClass].directSubClasses;
                    if (directSubClasses == null) {
                        directSubClasses = [];
                        schemaDef.classes[superClass].directSubClasses = directSubClasses;
                    }
                    directSubClasses.push(typeName);
                });
            }
        };
        for (var typeName in schemaDef.classes) {
            _loop_1(typeName);
        }
    };
    return Schema;
}());
exports.ifcSchema = new Schema();

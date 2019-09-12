import { ifc4 } from "./ifc4"
import { ifc2x3tc1 } from "./ifc2x3tc1"

class Schema {
    public ifc4: SchemaDefinition
    public ifc2x3: SchemaDefinition

    constructor() {
        this.ifc2x3 = ifc2x3tc1
        this.ifc4 = ifc4
        this.addSubtypesToSchema(this.ifc2x3)
        this.addSubtypesToSchema(this.ifc4)
    }

    isA(schema: "ifc2x3" | "ifc4", typeSubject: string, typeName: string): boolean {
        let isa = false
        if (typeSubject == typeName) {
            return true
        }
        let currentSchema = this[schema]
        let subject: SchemaEntry = currentSchema.classes[typeSubject]

        if (subject == null) {
            console.log(typeSubject, "not found")
        }
        if (!subject.superclasses) {
            subject.superclasses = []
        }
        subject.superclasses.some((superclass: string) => {
            if (superclass == typeName) {
                isa = true
                return true
            }
            if (this.isA(schema, superclass, typeName)) {
                isa = true
                return true
            }
            return false
        })
        return isa
    }

    listSubclasses(schema: "ifc2x3" | "ifc4", typeName: string): Set<string> {
        let res = this.recursiveListSubclasses(schema, typeName)
        res.delete(typeName)
        return res
    }

    private recursiveListSubclasses(schema: "ifc2x3" | "ifc4", typeName: string): Set<string> {
        let typeEntry = this[schema].classes[typeName]
        if (!typeEntry) {
            console.error(`Il tipo ${typeEntry} non esiste nello schema ${schema}`)
            return new Set()
        }
        let res = new Set([typeName])

        if (typeEntry.directSubClasses) {
            typeEntry.directSubClasses
                .map(sc => this.recursiveListSubclasses(schema, sc))
                .forEach(set => set.forEach(e => res.add(e)))
        }
        return res
    }

    private addSubtypesToSchema(schemaDef: SchemaDefinition) {
        for (let typeName in schemaDef.classes) {
            const type = schemaDef.classes[typeName]
            if (type.superclasses) {
                type.superclasses.forEach(superClass => {
                    let directSubClasses = schemaDef.classes[superClass].directSubClasses
                    if (directSubClasses == null) {
                        directSubClasses = []
                        schemaDef.classes[superClass].directSubClasses = directSubClasses
                    }
                    directSubClasses.push(typeName)
                })
            }
        }
    }
}

export const ifcSchema = new Schema()

import { ifcSchema } from "./schemas"

ifcSchema.isA("ifc2x3", "IfcWallStandardCase", "IfcWall")

console.log(`IfcWallStandardCase is a IfcWall: ${ifcSchema.isA("ifc2x3", "IfcWallStandardCase", "IfcWall")}`)
console.log(`IfcWall is a IfcWallStandardCase: ${ifcSchema.isA("ifc2x3", "IfcWall", "IfcWallStandardCase")}`)

// console.log("Sottoclassi di IfcWall")
// console.log(ifcSchema.listSubclasses("ifc4", "IfcTypeObject"))

let type = "IfcTypeObject"
let x = ifcSchema.listSubclasses("ifc4", type)

console.log(x)
console.log(x.size)
console.log(x.has(type))

console.log(JSON.stringify(Array.from(x)))

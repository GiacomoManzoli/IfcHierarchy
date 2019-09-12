declare type SchemaDefinition = {
    classes: { [name: string]: SchemaEntry }
}

declare type SchemaEntry = {
    domain?: string | null
    superclasses?: string[]
    directSubClasses?: string[]
    fields?: { [name: string]: EntryField }
}

declare type EntryField = {
    type: string
    reference: boolean
    many: boolean
    inverse: boolean
}

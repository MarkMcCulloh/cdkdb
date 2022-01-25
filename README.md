# CDK DB - DB constructs

Experimental nonsense

---

Example

```typescript
export class IdColumn extends Construct {
  readonly primaryKey: PrimaryKey;

  constructor(scope: Construct, id: string, table: Table) {
    super(scope, id);

    const col = new Column(this, "ID", {
      name: "id",
      type: new DBType("integer"),
      null: false,
      table,
    });

    this.primaryKey = new PrimaryKey(this, "IDPK", {
      columns: [col],
      table,
    });
  }
}

export class Person extends Construct {
  public readonly table: Table;

  constructor(scope: Construct, id: string, schema: Schema) {
    super(scope, id);

    this.table = new Table(this, "Person", {
      name: "person",
      schema,
    });

    new Column(this, "Name", {
      name: "name",
      type: new DBType("varchar", 255),
      table: this.table,
    });

    new Column(this, "Age", {
      name: "age",
      type: new DBType("integer"),
      null: true,
      table: this.table,
    });
  }
}

const root = new RootConstruct();
const schema = new Schema(root, "Schema", {
  name: "example",
});
const person = new Person(root, "Test", schema);
new IdColumn(person.table, "ID", person.table);
```

Result ([atlasgo ddl](https://atlasgo.io/))

```hcl
schema "example" {
}
table "person" {
  schema = schema.example
  column "id" {
    type = integer
    null = false
  }
  column "name" {
    type = varchar(255)
  }
  column "age" {
    type = integer
    null = true
  }
  primary_key {
    columns = [table.person.column.id]
  }
}
```

Links:
- https://github.com/aws/constructs
- https://github.com/ariga/atlas
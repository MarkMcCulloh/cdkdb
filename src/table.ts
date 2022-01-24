import { Construct } from "constructs";
import { IDDLConstruct } from "./ddl_construct";
import { Schema } from "./schema";

export interface TableOptions {
  readonly name: string;
  readonly schema: Schema;
}

export class Table extends Construct implements IDDLConstruct {
  readonly properties: string[] = ["schema"];
  public readonly typeName: string;
  public readonly name: string;
  public readonly schema: Schema;

  constructor(scope: Construct, id: string, options: TableOptions) {
    super(scope, id);

    this.typeName = "table";
    this.name = options.name;
    this.schema = options.schema;
  }

  getParent(): IDDLConstruct | undefined {
    return undefined;
  }
}

import { Construct } from "constructs";
import { Column } from "./column";
import { IDDLConstruct } from "./ddl_construct";
import { Table } from "./table";

export interface PrimaryKeyOptions {
  readonly columns: Column[];
  readonly table: Table;
}

export class PrimaryKey extends Construct implements IDDLConstruct {
  readonly properties: string[] = ["columns"];
  public readonly typeName: string;
  public readonly table: Table;
  public readonly columns: Column[];

  constructor(scope: Construct, id: string, options: PrimaryKeyOptions) {
    super(scope, id);

    this.typeName = "primary_key";
    this.table = options.table;
    this.columns = options.columns;
  }

  getParent(): IDDLConstruct {
    return this.table;
  }
}

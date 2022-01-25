import { Construct } from "constructs";
import { Column } from "./column";
import { IDDLConstruct } from "./ddl_construct";
import { Table } from "./table";

export interface IndexOptions {
  readonly name: string;
  readonly columns: Column[];
  readonly unique?: boolean;
  readonly table: Table;
}

export class Index extends Construct implements IDDLConstruct {
  readonly properties: string[] = ["columns", "unique"];
  public readonly typeName: string;
  public readonly name: string;
  public readonly unique?: boolean;
  public readonly table: Table;
  public readonly columns: Column[];

  constructor(scope: Construct, id: string, options: IndexOptions) {
    super(scope, id);

    this.typeName = "index";
    this.name = options.name;
    this.unique = options.unique;
    this.table = options.table;
    this.columns = options.columns;
  }

  getParent(): IDDLConstruct {
    return this.table;
  }
}

import { Construct } from "constructs";
import { DBType } from "./db_type";
import { IDDLConstruct } from "./ddl_construct";
import { Table } from "./table";

export interface ColumnOptions {
  readonly type: DBType;
  readonly unsigned?: boolean;
  readonly name: string;
  readonly null?: boolean;
  readonly default?: any;
  readonly table: Table;
}

export class Column extends Construct implements IDDLConstruct {
  properties: string[] = ["type", "null", "default", "unsigned"];
  public readonly typeName: string;
  public readonly name?: string;
  public readonly null?: boolean;
  public readonly default?: any;
  public readonly type: DBType;
  public readonly unsigned?: boolean;
  public readonly table: Table;

  constructor(scope: Construct, id: string, options: ColumnOptions) {
    super(scope, id);
    this.typeName = "column";
    this.type = options.type;
    this.unsigned = options.unsigned;
    this.name = options.name;
    this.null = options.null;
    this.default = options.default;
    this.table = options.table;
  }

  getParent(): IDDLConstruct {
    return this.table;
  }
}

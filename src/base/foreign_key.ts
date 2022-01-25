import { Construct } from "constructs";
import { Column } from "./column";
import { IDDLConstruct } from "./ddl_construct";
import { Table } from "./table";

export interface ForeignKeyOptions {
  readonly name: string;
  readonly columns: Column[];
  readonly referencedColumns: Column[];
  readonly onUpdate: string;
  readonly onDelete: string;
  readonly table: Table;
}

export class ForeignKey extends Construct implements IDDLConstruct {
  readonly properties: string[] = [
    "columns",
    "referencedColumns",
    "onUpdate",
    "onDelete",
  ];
  public readonly typeName: string;
  public readonly name?: string;
  public readonly table: Table;
  public readonly columns: Column[];
  public readonly referencedColumns: Column[];
  public readonly onUpdate: string;
  public readonly onDelete: string;

  constructor(scope: Construct, id: string, options: ForeignKeyOptions) {
    super(scope, id);

    this.typeName = "foreign_key";
    this.name = options.name;
    this.table = options.table;
    this.columns = options.columns;
    this.referencedColumns = options.referencedColumns;
    this.onUpdate = options.onUpdate;
    this.onDelete = options.onDelete;
  }

  getParent(): IDDLConstruct {
    return this.table;
  }
}

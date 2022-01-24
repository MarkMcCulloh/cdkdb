import { Construct } from "constructs";
import { IDDLConstruct } from "./ddl_construct";

export interface SchemaOptions {
  readonly name: string;
}

export class Schema extends Construct implements IDDLConstruct {
  properties: string[] = [];
  public readonly typeName: string;
  public readonly name: string;

  constructor(scope: Construct, id: string, options: SchemaOptions) {
    super(scope, id);

    this.typeName = "schema";
    this.name = options.name;
  }

  getParent(): IDDLConstruct | undefined {
    return undefined;
  }
}

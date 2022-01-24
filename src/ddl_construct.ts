export interface IDDLConstruct {
  // use to reference in resulting HCL
  // <typeName>.<name>.<attr name>
  typeName: string;
  name?: string;
  properties: string[];
  getParent(): IDDLConstruct | undefined;
}

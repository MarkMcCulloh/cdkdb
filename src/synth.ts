import { IConstruct, Node } from "constructs";
import { Column } from "./column";
import { IDDLConstruct } from "./ddl_construct";
import { PrimaryKey } from "./primary_key";
import { Schema } from "./schema";

export function dbSynth(rootConstruct: IConstruct) {
  let returnString = "";
  const schemas = findType<Schema>(rootConstruct, "schema");
  const tables = findType<Schema>(rootConstruct, "table");
  for (const stuff of [...schemas, ...tables]) {
    returnString += getString(stuff, 1) + "\n";
  }

  return returnString;
}

export function findType<TType>(
  rootConstruct: IConstruct,
  typeName: string,
  parent?: IDDLConstruct
) {
  const filterFn = (c: IConstruct) => {
    const cDDL = c as unknown as IDDLConstruct;
    if (cDDL.typeName === typeName) {
      if (parent) {
        return Node.of(c).addr === Node.of(parent as any).addr;
      } else {
        return true;
      }
    }
    return false;
  };

  return Node.of(rootConstruct)
    .findAll()
    .filter(filterFn) as unknown as TType[];
}

export function getValue(val: any): string | undefined {
  const type = typeof val;
  let wrappedVal = val;
  if (type === "string") {
    if ((val as string).startsWith("<[REF]|")) {
      wrappedVal = (val as string).split("|")[1];
    } else {
      wrappedVal = `"${val}"`;
    }
  } else if (Array.isArray(val)) {
    return `[${val
      .map(getValue)
      .filter((v) => v !== undefined)
      .join(", ")}]`;
  } else if (type === "object" && val !== null) {
    if ((val as IDDLConstruct).typeName !== undefined) {
      wrappedVal = ref(val).split("|")[1];
    } else if (typeof val.render === "function") {
      wrappedVal = val.render();
    }
  } else if (Array.isArray(val)) {
    return `[${val
      .map(getValue)
      .filter((v) => v !== undefined)
      .join(", ")}]`;
  }

  if (val !== undefined) {
    return wrappedVal;
  } else {
    return undefined;
  }
}

export function getString(construct: IDDLConstruct, level: number): string {
  const initialIndent = level === 0 ? "" : " ".repeat((level - 1) * 2);
  const indent = " ".repeat(level * 2);

  let returnString = construct.name
    ? `${initialIndent}${construct.typeName} "${construct.name}" {`
    : `${initialIndent}${construct.typeName} {`;

  const props = construct.properties;

  for (const prop of props) {
    if (prop !== "typeName" && prop !== "name") {
      const val = (construct as any)[prop];
      if (val !== undefined) {
        returnString += `\n${indent}${prop} = ${getValue(val)}`;
      }
    }
  }

  let children = [];

  if (construct.typeName === "table") {
    children.push(
      ...findType<Column>(Node.of(construct as any).root, "column")
    );
    children.push(
      ...findType<PrimaryKey>(Node.of(construct as any).root, "primary_key")
    );
  }

  for (const child of children) {
    const ddlChild = child as IDDLConstruct;
    returnString += `\n${getString(ddlChild, level + 1)}`;
  }

  returnString += `\n${initialIndent}}`;

  return returnString;
}

export function ref(construct: IDDLConstruct, field?: string) {
  let refString = construct.name
    ? `${construct.typeName}.${construct.name}`
    : construct.typeName;
  if (field) {
    refString = `${refString}.${field}`;
  }

  let iteratingConstruct = construct.getParent();

  while (iteratingConstruct !== undefined) {
    refString = `${iteratingConstruct.typeName}.${iteratingConstruct.name}.${refString}`;
    iteratingConstruct = iteratingConstruct.getParent();
  }

  return `<[REF]|${refString}|>`;
}

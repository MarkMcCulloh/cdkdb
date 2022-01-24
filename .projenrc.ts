import { cdk } from "projen";
const project = new cdk.JsiiProject({
  author: "Mark McCulloh",
  authorAddress: "Mark.McCulloh@gmail.com",
  defaultReleaseBranch: "main",
  name: "cdkdb",
  projenrcTs: true,
  repositoryUrl: "https://github.com/Mark.McCulloh/cdkdb.git",
  eslintOptions: {
    dirs: ["src"],
    devdirs: ["test"],
    prettier: true,
  },
  peerDeps: ["constructs"],

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();

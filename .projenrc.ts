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
  depsUpgrade: false,
  release: false,
});

project.synth();

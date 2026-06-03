import { parse } from "acorn";
import { walk } from "acorn-walk";

export const parseFn = (code: string) => {
  try {
    const ast = parse(code, { ecmaVersion: "latest", locations: true });
    let functionArgs: string[] = [];
    let functionBody: string = "";

    walk.simple(ast, {
      FunctionDeclaration(node) {
        functionArgs = node.params.map(param => param.name);
        functionBody = code.slice(node.body.start, node.body.end);
      },
      ArrowFunctionExpression(node) {
        functionArgs = node.params.map(param => param.name);
        functionBody = code.slice(node.body.start, node.body.end);
      }
    });

    return {
      args: functionArgs,
      body: functionBody
    };
  } catch (error) {
    console.error("Error parsing function:", error);
    return null;
  }
};
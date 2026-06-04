export function parseFunction(fn:any) {
  const source = fn.toString().trim();

  console.log(source);

  // Arrow function
  if (source.includes("=>")) {
    const [paramsPart, bodyPart] = source.split("=>");

    const params = paramsPart
      .trim()
      .replace(/^\(/, "")
      .replace(/\)$/, "")
      .split(",")
      .map((p:any) => p.trim())
      .filter(Boolean);

    let body = bodyPart.trim();

    if (body.startsWith("{")) {
      body = body.slice(1, -1).trim();
    } else {
      body = `return ${body};`;
    }

    return {
      params,
      body,
    };
  }

  // Normal function
  const paramsMatch = source.match(/\((.*?)\)/);

  const bodyMatch = source.match(/\{([\s\S]*)\}$/);

  return {
    params: paramsMatch
      ? paramsMatch[1]
          .split(",")
          .map((p:any) => p.trim())
          .filter(Boolean)
      : [],
    body: bodyMatch
      ? bodyMatch[1].trim()
      : "",
  };
}
export function parseFn(fn:any) {
  const src = fn.toString().trim();

  // Detect arrow function
  const isArrow = /^(\(|[a-zA-Z_$]).*=>/.test(src);

  let args, body;

  if (isArrow) {
    const arrowIndex = src.indexOf('=>');
    const argsPart = src.slice(0, arrowIndex).trim();

    // Remove wrapping parens if present: (a, b) → a, b
    const cleanArgs = argsPart.startsWith('(')
      ? argsPart.slice(1, -1)
      : argsPart;

    args = cleanArgs
      .split(',')
      .map((a:any) => a.trim())
      .filter(Boolean);

    const bodyPart = src.slice(arrowIndex + 2).trim();

    // Concise body (no braces) → wrap as implicit return
    body = bodyPart.startsWith('{')
      ? bodyPart.slice(1, -1).trim()
      : `return ${bodyPart}`;

  } else {
    // Normal function
    const argsMatch = src.match(/function\s*\w*\s*\(([^)]*)\)/);
    const rawArgs = argsMatch ? argsMatch[1] : '';

    args = rawArgs
      .split(',')
      .map((a:any) => a.trim())
      .filter(Boolean);

    const bodyStart = src.indexOf('{');
    const bodyEnd = src.lastIndexOf('}');
    body = src.slice(bodyStart + 1, bodyEnd).trim();
  }

  return { args, body };
}
import { parse } from "acorn";

export function getFunctionParts(code:string) {
  const ast = parse(code, {
    ecmaVersion: "latest"
  });

  const node = ast.body[0];

  let fn:any;

  if (node.type === "FunctionDeclaration") {
    fn = node;
  } else if (
    node.type === "VariableDeclaration" &&
    node.declarations[0].init
  ) {
    fn = node.declarations[0].init;
  } else {
    throw new Error("Unsupported function type");
  }

  const params = fn.params.map((param:any) =>
    code.slice(param.start, param.end)
  );

  const body = code.slice(
    fn.body.start + 1,
    fn.body.end - 1
  );

  return {
    params,
    body
  };
}

export function splitFunction(code:string) {
  const startParen = code.indexOf("(");
  const endParen = code.indexOf(")", startParen);

  const params = code
    .slice(startParen + 1, endParen)
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);

  const bodyStart = code.indexOf("{", endParen);

  let depth = 0;
  let bodyEnd = -1;

  for (let i = bodyStart; i < code.length; i++) {
    if (code[i] === "{") depth++;
    if (code[i] === "}") depth--;

    if (depth === 0) {
      bodyEnd = i;
      break;
    }
  }

  return {
    params,
    body: code.slice(bodyStart + 1, bodyEnd)
  };
}
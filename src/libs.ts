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
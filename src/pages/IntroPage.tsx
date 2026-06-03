import Layout from "@/Layout";

const featureCards = [
  {
    title: "Function Library",
    text: "Create reusable JavaScript functions with a name, source code, parsed arguments, notes, and timestamps.",
  },
  {
    title: "Run Workspace",
    text: "Select a saved function, enter values for its arguments, run it, and view the returned result immediately.",
  },
  {
    title: "Console Capture",
    text: "Console logs and errors are captured inside the right panel, so the browser console does not need to stay open.",
  },
  {
    title: "Snippet Groups",
    text: "Organize smaller code snippets inside groups. Each snippet can be created, edited, deleted, copied, and documented.",
  },
];

const workflow = [
  "Create a function or snippet group",
  "Write code in the editor",
  "Add notes for future context",
  "Save it locally",
  "Run functions or copy snippets when needed",
];

const storageRows = [
  {
    key: "custom_functions",
    value: "Stores the function library used on the Home page.",
  },
  {
    key: "snipptes",
    value: "Stores snippet groups, with snippet items saved inside each group's snippet key.",
  },
];

export default function IntroPage({setPage,page}:{setPage:any,page:string}) {
  return (
    <Layout page={page} setPage={setPage} actions={[]}>
      <div className="h-full overflow-auto p-4 md:p-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <section className="rounded-3xl border p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="mb-3 text-sm font-medium text-blue-500">
                  Personal JavaScript Workspace
                </div>
                <h1 className="text-4xl font-bold md:text-6xl">
                  Function Page
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-default-500">
                  Function Page is a local-first workspace for saving,
                  documenting, testing, and reusing JavaScript functions and
                  snippets. It is built for the small helpers you use again and
                  again but do not want to hunt through old projects to find.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Save", "Run", "Document", "Copy", "Reuse"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border px-4 py-2 text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border bg-default-50 p-4">
                <div className="mb-3 flex items-center justify-between rounded-full border bg-white px-4 py-2">
                  <span className="font-bold text-blue-500">Function Page</span>
                  <span className="rounded-full border px-3 py-1 text-sm font-semibold">
                    Create Function
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-[110px_1fr_180px]">
                  <div className="rounded-2xl border bg-white p-3 text-sm">
                    <div>hello</div>
                    <div>k</div>
                    <div className="font-medium text-blue-500">SchemaToDto</div>
                  </div>
                  <div className="rounded-2xl border bg-white p-4">
                    <div className="mb-3 flex justify-between">
                      <span className="font-semibold">SchemaToDto</span>
                      <span className="text-sm">03/06/2026</span>
                    </div>
                    <div className="mb-4 rounded-2xl bg-default-100 p-3 font-mono text-sm text-default-500">
                      schemaCode
                    </div>
                    <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100">
                      function schemaToDto(schemaCode) {"{"}
                      <br />
                      &nbsp;&nbsp;const classMatch = schemaCode.match(...);
                      <br />
                      &nbsp;&nbsp;return dtoCode;
                      <br />
                      {"}"}
                    </div>
                  </div>
                  <div className="rounded-2xl border bg-white p-4">
                    <div className="font-bold">Output</div>
                    <div className="mt-2 font-mono">null</div>
                    <div className="mt-8 font-bold">Console</div>
                    <div className="mt-2 h-32 rounded-2xl bg-black p-3 font-mono text-sm text-white">
                      No logs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((feature) => (
              <div key={feature.title} className="rounded-2xl border p-5">
                <h2 className="font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-default-500">
                  {feature.text}
                </p>
              </div>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border p-6">
              <h2 className="text-2xl font-bold">Screen Layout</h2>
              <div className="mt-5 space-y-4 text-default-500">
                <p>
                  The top rounded bar contains the product name, navigation
                  buttons for Home, Snippets, and About, plus the main action
                  for the current page.
                </p>
                <p>
                  On the Home page, the left sidebar lists saved functions. The
                  center panel shows the selected function, its argument inputs,
                  code, notes, and actions. The right panel shows output and
                  captured console messages.
                </p>
                <p>
                  On the Snippets page, the left sidebar lists snippet groups.
                  The main area shows cards for each snippet, with copy at the
                  top and edit/delete actions in a rounded action box at the
                  bottom.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border p-6">
              <h2 className="text-2xl font-bold">Function Details</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-default-100 p-4">
                  <h3 className="font-semibold">Create</h3>
                  <p className="mt-2 text-sm text-default-500">
                    Functions are added from the Create Function modal with a
                    name, JavaScript source, and notes.
                  </p>
                </div>
                <div className="rounded-2xl bg-default-100 p-4">
                  <h3 className="font-semibold">Parse</h3>
                  <p className="mt-2 text-sm text-default-500">
                    The app parses function arguments and body, then rebuilds
                    the callable function when you press Run.
                  </p>
                </div>
                <div className="rounded-2xl bg-default-100 p-4">
                  <h3 className="font-semibold">Edit</h3>
                  <p className="mt-2 text-sm text-default-500">
                    Existing functions keep their original id and created date,
                    while updates receive a fresh updated timestamp.
                  </p>
                </div>
                <div className="rounded-2xl bg-default-100 p-4">
                  <h3 className="font-semibold">Delete</h3>
                  <p className="mt-2 text-sm text-default-500">
                    Delete actions ask for confirmation before removing saved
                    functions or snippets from local storage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border p-6">
            <h2 className="text-2xl font-bold">Snippet Details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border p-4">
                <h3 className="font-semibold">Groups</h3>
                <p className="mt-2 text-sm text-default-500">
                  Snippets live inside groups. A group has an id, name,
                  createdAt, updatedAt, and a snippet array.
                </p>
              </div>
              <div className="rounded-2xl border p-4">
                <h3 className="font-semibold">Items</h3>
                <p className="mt-2 text-sm text-default-500">
                  Each item stores its name, code, notes, created date, and
                  optional updated date.
                </p>
              </div>
              <div className="rounded-2xl border p-4">
                <h3 className="font-semibold">Copy Feedback</h3>
                <p className="mt-2 text-sm text-default-500">
                  The copy button writes snippet code to the clipboard, shows a
                  check mark for two seconds, then returns to the copy icon.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border p-6">
              <h2 className="text-2xl font-bold">Workflow</h2>
              <div className="mt-5 space-y-3">
                {workflow.map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="text-default-600">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border p-6">
              <h2 className="text-2xl font-bold">Local Storage</h2>
              <p className="mt-3 text-default-500">
                The project is local-first. Saved data stays in the browser's
                local storage instead of being sent to a server.
              </p>
              <div className="mt-5 space-y-3">
                {storageRows.map((row) => (
                  <div key={row.key} className="rounded-2xl bg-default-100 p-4">
                    <div className="font-mono text-sm font-semibold">
                      {row.key}
                    </div>
                    <div className="mt-1 text-sm text-default-500">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border p-6">
            <h2 className="text-2xl font-bold">Example Function</h2>
            <div className="mt-4 overflow-auto rounded-2xl bg-slate-950 p-4 font-mono text-sm text-slate-100">
              {`function greet(name) {
  console.log("Hello " + name);
  return "Welcome " + name;
}`}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-default-100 p-4">
                <div className="text-sm text-default-500">Input</div>
                <div className="font-semibold">Krishna</div>
              </div>
              <div className="rounded-2xl bg-default-100 p-4">
                <div className="text-sm text-default-500">Output</div>
                <div className="font-semibold">Welcome Krishna</div>
              </div>
              <div className="rounded-2xl bg-default-100 p-4">
                <div className="text-sm text-default-500">Console</div>
                <div className="font-semibold">[LOG] Hello Krishna</div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="mt-2 text-default-500">
                  For questions, feedback, or help with Function Page, reach out
                  directly.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="tel:7050037790"
                  className="w-fit rounded-full border px-5 py-3 font-semibold text-blue-500 transition hover:border-blue-500 hover:bg-blue-50"
                >
                  Call 7050037790
                </a>
                <a
                  href="https://wa.me/917050037790"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit rounded-full border px-5 py-3 font-semibold text-green-600 transition hover:border-green-500 hover:bg-green-50"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </section>

          <section className="pb-8 text-center">
            <h2 className="text-3xl font-bold">Write Once. Reuse Forever.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-default-500">
              Use Function Page as a personal toolbox for reusable functions,
              conversion helpers, DTO generators, tiny scripts, and code
              snippets you want close at hand.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}

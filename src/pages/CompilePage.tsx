import { Button } from "@heroui/react";
import {
  FaArrowLeft,
  FaBug,
  FaCode,
  FaPlay,
  FaSave,
  FaTerminal,
} from "react-icons/fa";
import Layout from "@/Layout";

function CompilePage({page,setPage}:{page:string,setPage:any}) {
  return (
    <Layout page={page} setPage={setPage} actions={[]}>
      <div className="flex h-full overflow-auto rounded-2xl border bg-default-50 p-4 md:p-8">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <section>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold text-blue-500">
              <FaTerminal />
              Compiler Coming Soon
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Run and test code right inside Function Page.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-default-500">
              The compiler workspace is being built for quick experiments,
              function testing, saved code drafts, console output, and cleaner
              debugging without leaving your local code toolbox.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                onPress={() => setPage("home")}
                variant="primary"
                className="gap-2"
              >
                <FaArrowLeft />
                Back to My Functions
              </Button>
              <Button onPress={() => setPage("snippet")} variant="outline">
                Open Snippets
              </Button>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: <FaCode />,
                  title: "Write",
                  text: "Draft JavaScript in a focused editor.",
                },
                {
                  icon: <FaPlay />,
                  title: "Run",
                  text: "Execute code and inspect returned values.",
                },
                {
                  icon: <FaSave />,
                  title: "Save",
                  text: "Keep useful compiler drafts for later.",
                },
                {
                  icon: <FaBug />,
                  title: "Debug",
                  text: "Review console logs and errors in one place.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border bg-white p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                    {item.icon}
                  </div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-default-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between rounded-xl border bg-default-50 px-4 py-3">
              <div className="font-semibold">compiler.js</div>
              <div className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                Soon
              </div>
            </div>
            <div className="rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100">
              <div className="text-blue-300">function runCompiler() {"{"}</div>
              <div className="pl-4">const code = editor.value;</div>
              <div className="pl-4">saveDraft(code);</div>
              <div className="pl-4">const output = execute(code);</div>
              <div className="pl-4">return output;</div>
              <div className="text-blue-300">{"}"}</div>
            </div>
            <div className="mt-4 rounded-xl border bg-default-50 p-4">
              <div className="text-sm font-semibold text-default-500">
                Console
              </div>
              <div className="mt-2 font-mono text-sm">
                Waiting for launch...
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default CompilePage

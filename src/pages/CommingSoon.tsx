import { Button } from "@heroui/react";
import { FaArrowLeft, FaCode, FaRocket, FaTools } from "react-icons/fa";
import Layout from "@/Layout";

const progressItems = [
  {
    icon: <FaTools />,
    title: "Designing the workflow",
    text: "Shaping the feature so it fits naturally into your function workspace.",
  },
  {
    icon: <FaCode />,
    title: "Building the details",
    text: "Adding the logic, screens, and small interactions that make it useful.",
  },
  {
    icon: <FaRocket />,
    title: "Preparing launch",
    text: "Testing the experience before it becomes part of the main app.",
  },
];

export default function CommingSoon({
  page,
  setPage,
}: {
  page: string;
  setPage: (page: string) => void;
}) {
  return (
    <Layout page={page} setPage={setPage} actions={[]}>
      <div className="flex h-full overflow-auto rounded-2xl border bg-default-50 p-4 md:p-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col justify-center gap-8">
          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm font-semibold text-blue-500">
                Coming Soon
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Something useful is on the way.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-default-500">
                This section is being prepared for Function Page. It will be
                available soon with the same local-first, reusable-code mindset
                as the rest of the workspace.
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
                <Button
                  onPress={() => setPage("functionLib")}
                  variant="outline"
                >
                  Explore Function Library
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="rounded-xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100">
                <div className="text-blue-300">const nextFeature = {"{"}</div>
                <div className="pl-4">status: "building",</div>
                <div className="pl-4">workspace: "Function Page",</div>
                <div className="pl-4">release: "soon",</div>
                <div className="pl-4">promise: "worth the wait"</div>
                <div className="text-blue-300">{"};"}</div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {progressItems.map((item) => (
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
          </section>
        </div>
      </div>
    </Layout>
  );
}

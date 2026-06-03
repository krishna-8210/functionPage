import { useMemo, useState } from "react";
import { Button, Card, Input } from "@heroui/react";
import { liblist } from "@/functionlibData";
import Layout from "@/Layout";
import { localStorageLib_for_function } from "@/localStoragelib";


type FunctionLibraryItem = {
  id: string;
  name: string;
  tags: string[];
  details: string;
  whyUse: string;
  saveTime: string;
  code: any;
  functionArgs: string[];
  functionBody: string;
  inputType: string[];
  outputType: string[];
  useCases: any[];
};

// const formatDataLib = () => {
//   const parsed = liblist_pre1.map((e: any) => {
//     const pp = parseFn(`${e.code}`);
//     return {
//       ...e,
//       functionArgs: pp.args,
//       functionBody: pp.body,
//       code: `${e.code}`,
//     };
//   });
//   console.log(parsed);
// };

const category2 = [
  {
    name: "All",
    tags: [],
  },
  {
    name: "Developer",
    tags: ["developer", "json", "api", "database", "jwt", "typescript"],
  },
  {
    name: "Finance & Accounting",
    tags: ["accountant", "ca", "gst", "invoice", "audit", "bank", "tax"],
  },
  {
    name: "HR & Recruitment",
    tags: ["hr", "resume", "candidate", "hiring", "interview"],
  },
  {
    name: "Sales & CRM",
    tags: ["sales", "lead", "pipeline", "proposal", "forecast"],
  },
  {
    name: "Marketing & SEO",
    tags: ["marketing", "keyword", "seo", "content", "campaign"],
  },
  {
    name: "Freelancer & Agency",
    tags: ["freelancer", "agency", "quotation", "pricing", "client", "project"],
  },
];

function renderValue(value: any) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}

function normalizeUseCases(item: FunctionLibraryItem) {
  if (Array.isArray(item.useCases)) return item.useCases;
  return [];
}

function getItemTags(item: FunctionLibraryItem) {
  return Array.isArray(item.tags) ? item.tags : [];
}

function FunctionLib({
  page,
  setPage,
}: {
  page: string;
  setPage: (page: string) => void;
}) {
  //   const items = liblist as FunctionLibraryItem[];
  const items = liblist as FunctionLibraryItem[];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(items[0]?.id || "");
//   const [seletedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedCategoryData = category2.find(
    (category) => category.name === selectedCategory,
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    const categoryTags = selectedCategoryData?.tags || [];

    return items.filter((item) => {
      const itemTags = getItemTags(item);
      const matchesCategory =
        categoryTags.length === 0 ||
        itemTags.some((tag) => categoryTags.includes(tag.toLowerCase()));

      const searchableText = [
        item.name,
        item.details,
        item.whyUse,
        item.saveTime,
        itemTags.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [items, search, selectedCategoryData]);

  const selectedItem =
    filteredItems.find((item) => item.id === selectedId) ||
    filteredItems[0] ||
    items[0];

  const selectedUseCases = selectedItem ? normalizeUseCases(selectedItem) : [];

  const handleFork = (item: FunctionLibraryItem) => {
    console.log("Fork action pending:", item);
    const saveObject = {
      ...item,

      code: item.code.toString(),
    };
    console.log(saveObject)
    localStorageLib_for_function.fork(saveObject);
    alert("This Function is added in your Function Page (see in my function)");
  };

  return (
    <Layout page={page} setPage={setPage} actions={[]}>
      <div className="flex h-full w-full gap-2">
        <aside className="h-full w-72 shrink-0 overflow-auto rounded-2xl border p-3">
          <div
            onClick={() => {
              console.log(liblist);
            }}
            className="font-semibold"
          >
            Category
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {category2.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`rounded-full border px-3 py-2 text-left text-sm transition hover:border-blue-500 hover:text-blue-500 ${
                  selectedCategory === category.name
                    ? "border-blue-500 bg-blue-50 text-blue-500"
                    : ""
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex h-full min-w-0 flex-1 flex-col gap-3">
          <div className="rounded-full border p-1">
            <Input
              placeholder="Search function library"
              variant="secondary"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="rounded-full"
            />
          </div>

          <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="min-h-0 overflow-auto rounded-2xl border p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-semibold">Functions</div>
                <div className="text-sm text-default-500">
                  {filteredItems.length} found
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {filteredItems.length === 0 ? (
                  <Card variant="default" className="p-5">
                    <div className="text-sm text-default-500">
                      No functions match this search.
                    </div>
                  </Card>
                ) : (
                  filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                        // setSelectedIndex(index);
                      }}
                      className={`rounded-2xl border p-4 text-left transition  hover:bg-blue-50 ${
                        selectedItem?.id === item.id
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <p className="mt-1 line-clamp-2 text-sm text-default-500">
                            {item.details || item.whyUse || "Reusable function"}
                          </p>
                        </div>
                        {item.saveTime && (
                          <span className="shrink-0 rounded-full bg-default-100 px-2 py-1 text-xs">
                            {item.saveTime}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {getItemTags(item)
                          .slice(0, 5)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border px-2 py-1 text-xs text-default-500"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="min-h-0 overflow-auto rounded-2xl border p-4">
              {selectedItem ? (
                <div className="flex flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">
                        {selectedItem.name}
                      </h1>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {getItemTags(selectedItem).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border px-2 py-1 text-xs text-default-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onPress={() => handleFork(selectedItem)}
                    >
                      Fork
                    </Button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <Card variant="default" className="p-4">
                      <div className="text-xs text-default-500">Save Time</div>
                      <div className="mt-1 font-semibold">
                        {selectedItem.saveTime || "Not specified"}
                      </div>
                    </Card>
                    <Card variant="default" className="p-4">
                      <div className="text-xs text-default-500">Input</div>
                      <div className="mt-1 font-semibold">
                        {(selectedItem.inputType || []).join(", ") || "Any"}
                      </div>
                    </Card>
                    <Card variant="default" className="p-4">
                      <div className="text-xs text-default-500">Output</div>
                      <div className="mt-1 font-semibold">
                        {(selectedItem.outputType || []).join(", ") || "Any"}
                      </div>
                    </Card>
                  </div>

                  <section>
                    <h2 className="font-semibold">Details</h2>
                    <p className="mt-2 leading-relaxed text-default-500">
                      {selectedItem.details || "No details provided."}
                    </p>
                  </section>

                  <section>
                    <h2 className="font-semibold">Why Use</h2>
                    <p className="mt-2 leading-relaxed text-default-500">
                      {selectedItem.whyUse || "No use case summary provided."}
                    </p>
                  </section>

                  {selectedItem.functionArgs &&
                    selectedItem.functionArgs.length > 0 && (
                      <section>
                        <h2 className="font-semibold">Arguments</h2>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedItem.functionArgs.map((arg, index) => (
                            <span
                              key={`${arg}-${index}`}
                              className="rounded-full bg-default-100 px-3 py-1 font-mono text-sm"
                            >
                              {arg}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                  <section>
                    <h2 className="font-semibold">Code</h2>
                    <pre className="mt-2 max-h-[320px] overflow-auto rounded-2xl border border-slate-700 bg-slate-950 p-4 font-mono text-sm text-slate-100 whitespace-pre-wrap">
                      {"" + selectedItem.code + "" || "No code provided."}
                    </pre>
                  </section>

                  <section>
                    <h2 className="font-semibold">Use Cases</h2>
                    <div className="mt-2 flex flex-col gap-3">
                      {selectedUseCases.length === 0 ? (
                        <Card variant="default" className="p-4">
                          <div className="text-sm text-default-500">
                            No use cases provided.
                          </div>
                        </Card>
                      ) : (
                        selectedUseCases.map((useCase: any, index: number) => (
                          <Card
                            key={`${selectedItem.id}-usecase-${index}`}
                            variant="default"
                            className="p-4"
                          >
                            <div className="font-semibold">
                              {useCase.title || `Use Case ${index + 1}`}
                            </div>
                            {useCase.description && (
                              <p className="mt-1 text-sm text-default-500">
                                {useCase.description}
                              </p>
                            )}
                            <div className="mt-3 grid gap-3 md:grid-cols-2">
                              <div>
                                <div className="mb-1 text-xs font-semibold text-default-500">
                                  Input
                                </div>
                                <pre className="overflow-auto rounded-xl bg-default-100 p-3 text-xs whitespace-pre-wrap">
                                  {renderValue(useCase.input)}
                                </pre>
                              </div>
                              <div>
                                <div className="mb-1 text-xs font-semibold text-default-500">
                                  Output
                                </div>
                                <pre className="overflow-auto rounded-xl bg-default-100 p-3 text-xs whitespace-pre-wrap">
                                  {renderValue(useCase.output)}
                                </pre>
                              </div>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </section>
                </div>
              ) : (
                <Card variant="default" className="p-5">
                  <div className="text-sm text-default-500">
                    Select a function to view details.
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default FunctionLib;

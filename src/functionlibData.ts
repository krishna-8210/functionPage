export const liblist = [
  {
    isAllGood: "true",
    id: "fn_remove_duplicate_lines",
    tags: ["developer", "text", "cleanup"],
    name: "Remove Duplicate Lines",
    details: "Remove duplicate lines while preserving order.",
    whyUse: "Useful for cleaning logs, emails, exported reports, and datasets.",
    saveTime: "10-20 minutes of manual cleanup",
    useCases: [
      {
        input: "apple\napple\nbanana",
        output: "apple\nbanana",
      },
    ],
    functionArgs: ["text"],
    functionBody: 'return [...new Set(text.split("\\n"))].join("\\n");',
    inputType: [],
    outputType: [],
    code: `function removeDuplicateLines(text: string) {
      return [...new Set(text.split("\\n"))].join("\\n");
    }`,
  },
  {
    isAllGood: "true",
    id: "fn_calculate_interest",
    tags: ["developer", "text", "cleanup"],
    name: "Calculate Interest",
    details: "It calculate interest",
    whyUse: "Its save time and error proof",
    saveTime: "10-20 minutes of calculation",
    useCases: [
      {
        input: `
        amount->100000,
  annualRate->12,
  startDate->"2025-01-01",
  endDate->"2025-07-01"
        `,
        output: `
        {
  "principalAmount": "20000   ",
  "interestRate": "36  ",
  "startDate": " 05-02-2025 ",
  "endDate": "09-09-2025    ",
  "totalDays": "130",
  "totalMonths": "4.33",
  "dailyInterest": "19.73",
  "monthlyInterest": 600,
  "totalInterest": "2564.38",
  "totalAmount": "22564.38"
}
        `,
      },
    ],
    functionArgs: ["amount", "annualRate", "startDate", "endDate"],
    functionBody: `
     const start = new Date(startDate);
  const end = new Date(endDate);
  
  const diffTime = end.getTime() - start.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
console.log(diffTime,totalDays)

  const totalMonths = totalDays / 30;

  const yearlyInterest = (amount * annualRate) / 100;
  const monthlyInterest = yearlyInterest / 12;
  const dailyInterest = yearlyInterest / 365;

  const totalInterest = dailyInterest * totalDays;
  const totalAmount = Number(amount) + Number(totalInterest);

  return {
    principalAmount: amount,
    interestRate: annualRate,
    startDate,
    endDate,
    totalDays: Number(totalDays).toFixed(0),
    totalMonths: Number(totalMonths).toFixed(2),
    dailyInterest: Number(dailyInterest).toFixed(2),
    monthlyInterest: Number(monthlyInterest.toFixed(2)),
    totalInterest: Number(totalInterest).toFixed(2),
    totalAmount: Number(totalAmount).toFixed(2)
  };
    
    `,
    inputType: [],
    outputType: [],
    code: ` function calculateSimpleInterest(amount, annualRate, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const diffTime = end.getTime() - start.getTime();
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
console.log(diffTime,totalDays)

  const totalMonths = totalDays / 30;

  const yearlyInterest = (amount * annualRate) / 100;
  const monthlyInterest = yearlyInterest / 12;
  const dailyInterest = yearlyInterest / 365;

  const totalInterest = dailyInterest * totalDays;
  const totalAmount = Number(amount) + Number(totalInterest);

  return {
    principalAmount: amount,
    interestRate: annualRate,
    startDate,
    endDate,
    totalDays: Number(totalDays).toFixed(0),
    totalMonths: Number(totalMonths).toFixed(2),
    dailyInterest: Number(dailyInterest).toFixed(2),
    monthlyInterest: Number(monthlyInterest.toFixed(2)),
    totalInterest: Number(totalInterest).toFixed(2),
    totalAmount: Number(totalAmount).toFixed(2)
  };

}
    `,
  },

  {
    id: "fn_csv_to_json",
    tags: ["developer", "csv", "json", "data"],
    name: "CSV To JSON",
    details: "Convert CSV rows into JSON objects.",
    whyUse: "Most APIs require JSON while exported files are often CSV.",
    saveTime: "15-30 minutes of manual conversion",
    useCases: [
      {
        input: "name,age\nKripa,24",
        output: [
          {
            name: "Kripa",
            age: "24",
          },
        ],
      },
    ],
    code: `function csvToJson(csv: string) {
      const rows = csv.trim().split("\n");
      const headers = rows[0].split(",");
      return rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj: any, h: any, i: number) => {
          obj[h.trim()] = values[i]?.trim();
          return obj;
        }, {});
      });
    }`,
    functionArgs: ["csv"],
    functionBody:
      'const rows = csv.trim().split("\\n");\n      const headers = rows[0].split(",");\n      return rows.slice(1).map((row) => {\n        const values = row.split(",");\n        return headers.reduce((obj, h, i) => {\n          obj[h.trim()] = values[i]?.trim();\n          return obj;\n        }, {});\n      });',
    inputType: [],
    outputType: [],
  },
  {
    id: "fn_jwt_decoder",
    tags: ["developer", "jwt", "authentication", "security"],
    name: "JWT Decoder",
    details: "Decode JWT token payload and header.",
    whyUse: "Inspect token contents without writing temporary code.",
    saveTime: "10-15 minutes every authentication debugging session",
    useCases: {
      input: "eyJhbGciOiJIUzI1NiIs...",
      output: [
        {
          userId: 1,
          role: "admin",
        },
      ],
    },
    functionArgs: ["token"],
    functionBody:
      'const [header, payload] = token.split(".");\n      return {\n        header: JSON.parse(atob(header)),\n        payload: JSON.parse(atob(payload))\n      };',
    inputType: [],
    outputType: [],
    code: `function jwtDecoder(token: string) {
      const [header, payload] = token.split(".");
      return {
        header: JSON.parse(atob(header)),
        payload: JSON.parse(atob(payload)),
      };
    }`,
  },
  {
    id: "fn_json_formatter",
    tags: ["developer", "json", "api", "formatter"],
    name: "JSON Formatter",
    details: "Convert minified JSON into readable formatted JSON.",
    whyUse:
      "Developers frequently receive compact API responses that are difficult to read.",
    saveTime: "5-10 minutes per debugging session",
    useCases: [
      {
        input: '{"name":"Kripa","age":24}',
        output: '{\n  "name": "Kripa",\n  "age": 24\n}',
      },
    ],
    functionArgs: ["jsonString"],
    functionBody: "return JSON.stringify(JSON.parse(jsonString), null, 2);",
    inputType: [],
    outputType: [],
    code: `function jsonFormatter(jsonString: string) {
      return JSON.stringify(JSON.parse(jsonString), null, 2);
    }`,
  },
  {
    id: "6ab07d0d-9b48-4ffa-83aa-77fc23ed44c1",
    name: "tee2",
    tags: [],
    details: "",
    whyUse: "",
    saveTime: "",
    functionArgs: ["bankCsv", "booksCsv"],
    inputType: [],
    outputType: [],
    useCases: [],
    functionBody:
      'function csvToJson2(csv) {\n        const lines = csv.trim().split("\\\\n");\n        const headers = lines[0].split(",").map((h) => h.trim());\n        return lines.slice(1).map((line) => {\n          const values = line.split(",");\n          return headers.reduce((obj, header, index) => {\n            obj[header] = values[index]?.trim();\n            return obj;\n          }, {});\n        });\n      }\n      const bank = csvToJson2(bankCsv);\n      const books = csvToJson2(booksCsv);\n      const matched = [];\n      const missingInBooks = [];\n      const amountMismatch = [];\n      const bookMap = /* @__PURE__ */ new Map();\n      books.forEach((item) => {\n        bookMap.set(item.Reference, item);\n      });\n      bank.forEach((bankTxn) => {\n        const bookTxn = bookMap.get(bankTxn.Reference);\n        if (!bookTxn) {\n          missingInBooks.push(bankTxn);\n          return;\n        }\n        if (Number(bankTxn.Amount) !== Number(bookTxn.Amount)) {\n          amountMismatch.push({\n            reference: bankTxn.Reference,\n            bankAmount: Number(bankTxn.Amount),\n            bookAmount: Number(bookTxn.Amount)\n          });\n          return;\n        }\n        matched.push(bankTxn);\n        bookMap.delete(bankTxn.Reference);\n      });\n      const missingInBank = Array.from(bookMap.values());\n      return {\n        summary: {\n          matched: matched.length,\n          missingInBooks: missingInBooks.length,\n          missingInBank: missingInBank.length,\n          amountMismatch: amountMismatch.length\n        },\n        matched,\n        missingInBooks,\n        missingInBank,\n        amountMismatch\n      };',
    createdAt: 1780478859237,
    notes: "efcw",
    code: function bankReconciliation(bankCsv: string, booksCsv: string) {
      function csvToJson(csv: string) {
        const lines = csv.trim().split("\\n");
        const headers = lines[0].split(",").map((h) => h.trim());
        return lines.slice(1).map((line) => {
          const values = line.split(",");
          return headers.reduce((obj: any, header: any, index: any) => {
            obj[header] = values[index]?.trim();
            return obj;
          }, {});
        });
      }
      const bank = csvToJson(bankCsv);
      const books = csvToJson(booksCsv);
      const matched: any = [];
      const missingInBooks: any = [];
      const amountMismatch: any = [];
      const bookMap = new Map();
      books.forEach((item) => {
        bookMap.set(item.Reference, item);
      });
      bank.forEach((bankTxn) => {
        const bookTxn = bookMap.get(bankTxn.Reference);
        if (!bookTxn) {
          missingInBooks.push(bankTxn);
          return;
        }
        if (Number(bankTxn.Amount) !== Number(bookTxn.Amount)) {
          amountMismatch.push({
            reference: bankTxn.Reference,
            bankAmount: Number(bankTxn.Amount),
            bookAmount: Number(bookTxn.Amount),
          });
          return;
        }
        matched.push(bankTxn);
        bookMap.delete(bankTxn.Reference);
      });
      const missingInBank = Array.from(bookMap.values());
      return {
        summary: {
          matched: matched.length,
          missingInBooks: missingInBooks.length,
          missingInBank: missingInBank.length,
          amountMismatch: amountMismatch.length,
        },
        matched,
        missingInBooks,
        missingInBank,
        amountMismatch,
      };
    },
  },
  {
    createdAt: 1780478859237,
    functionArgs: ["bankCsv", "booksCsv"],
    functionBody:
      'function csvToJson2(csv) {\n        const lines = csv.trim().split("\\n").filter(Boolean);\n        const headers = lines[0].split(",").map((h) => h.trim());\n        return lines.slice(1).map((line) => {\n          const values = line.split(",");\n          return headers.reduce((obj, header, index) => {\n            obj[header] = values[index]?.trim() || "";\n            return obj;\n          }, {});\n        });\n      }\n      function normalizeAmount(amount) {\n        return Number(String(amount).replace(/,/g, "").trim());\n      }\n      const bank = csvToJson2(bankCsv);\n      const books = csvToJson2(booksCsv);\n      const matched = [];\n      const missingInBooks = [];\n      const missingInBank = [];\n      const amountMismatch = [];\n      const bookMap = /* @__PURE__ */ new Map();\n      books.forEach((bookTxn) => {\n        const ref = bookTxn.Reference?.trim();\n        if (!ref) return;\n        bookMap.set(ref, bookTxn);\n      });\n      bank.forEach((bankTxn) => {\n        const ref = bankTxn.Reference?.trim();\n        const bookTxn = bookMap.get(ref);\n        if (!bookTxn) {\n          missingInBooks.push(bankTxn);\n          return;\n        }\n        const bankAmount = normalizeAmount(bankTxn.Amount);\n        const bookAmount = normalizeAmount(bookTxn.Amount);\n        if (bankAmount !== bookAmount) {\n          amountMismatch.push({\n            reference: ref,\n            bankAmount,\n            bookAmount,\n            difference: bankAmount - bookAmount,\n            bankRecord: bankTxn,\n            bookRecord: bookTxn\n          });\n          bookMap.delete(ref);\n          return;\n        }\n        matched.push({\n          reference: ref,\n          amount: bankAmount,\n          bankRecord: bankTxn,\n          bookRecord: bookTxn\n        });\n        bookMap.delete(ref);\n      });\n      missingInBank.push(...Array.from(bookMap.values()));\n      const reconciliationRate = bank.length === 0 ? 0 : Number((matched.length / bank.length * 100).toFixed(2));\n      return {\n        summary: {\n          totalBankTransactions: bank.length,\n          totalBookTransactions: books.length,\n          matched: matched.length,\n          missingInBooks: missingInBooks.length,\n          missingInBank: missingInBank.length,\n          amountMismatch: amountMismatch.length,\n          reconciliationRate: reconciliationRate + "%"\n        },\n        matched,\n        missingInBooks,\n        missingInBank,\n        amountMismatch\n      };',
    id: "fn_bank_reconciliation",
    tags: ["accountant", "ca", "finance", "audit", "banking", "reconciliation"],
    name: "Bank Reconciliation",
    details:
      "Bank Reconciliation compares transactions recorded in accounting books against transactions appearing in the bank statement. It automatically identifies matched transactions, transactions missing in accounting records, transactions missing in bank records, and amount mismatches. This process is commonly performed during monthly closing, audits, tax filing, and financial reviews to ensure accounting records accurately reflect actual bank activity.",
    whyUse:
      "Manually comparing hundreds or thousands of bank transactions against accounting records is time-consuming and error-prone. This function automates reconciliation by matching transactions using references and amounts, helping accountants quickly identify missing entries, duplicate postings, bank charges not recorded in books, incorrect amounts, and other discrepancies. It significantly reduces reconciliation time and improves accuracy during audits and financial reporting.",
    saveTime: "2-8 hours",
    inputType: ["csv"],
    outputType: ["json"],
    useCases: [
      {
        title: "Monthly Book Closing",
        description:
          "Reconcile accounting books against bank statements before month-end closing.",
        input: {
          bankCsv: "Date,Reference,Amount\n2025-01-01,TXN001,1000",
          booksCsv: "Date,Reference,Amount\n2025-01-01,TXN001,1000",
        },
        output: {
          matched: 1,
          missingInBooks: 0,
          missingInBank: 0,
          amountMismatch: 0,
        },
      },
      {
        title: "Detect Missing Book Entries",
        description:
          "Identify bank transactions that were never recorded in accounting software.",
        input: {
          bankCsv: "Date,Reference,Amount\n2025-01-01,TXN005,500",
          booksCsv: "Date,Reference,Amount",
        },
        output: {
          matched: 0,
          missingInBooks: 1,
          missingInBank: 0,
          amountMismatch: 0,
        },
      },
      {
        title: "Audit Verification",
        description:
          "Detect amount differences between bank and accounting records during audit reviews.",
        input: {
          bankCsv: "Date,Reference,Amount\n2025-01-01,TXN010,1000",
          booksCsv: "Date,Reference,Amount\n2025-01-01,TXN010,1200",
        },
        output: {
          matched: 0,
          missingInBooks: 0,
          missingInBank: 0,
          amountMismatch: 1,
        },
      },
    ],
    code: `(bankCsv, booksCsv) => {
  function csvToJson(csv) {
    const lines = csv.trim().split("\n").filter(Boolean);

    const headers = lines[0].split(",").map((h) => h.trim());

    return lines.slice(1).map((line) => {
      const values = line.split(",");

      return headers.reduce((obj, header, index) => {
        obj[header] = values[index]?.trim() || "";
        return obj;
      }, {});
    });
  }

  function normalizeAmount(amount) {
    return Number(String(amount).replace(/,/g, "").trim());
  }

  const bank = csvToJson(bankCsv);
  const books = csvToJson(booksCsv);

  const matched = [];
  const missingInBooks = [];
  const missingInBank = [];
  const amountMismatch = [];

  const bookMap = new Map();

  books.forEach((bookTxn) => {
    const ref = bookTxn.Reference?.trim();

    if (!ref) return;

    bookMap.set(ref, bookTxn);
  });

  bank.forEach((bankTxn) => {
    const ref = bankTxn.Reference?.trim();

    const bookTxn = bookMap.get(ref);

    if (!bookTxn) {
      missingInBooks.push(bankTxn);
      return;
    }

    const bankAmount = normalizeAmount(bankTxn.Amount);
    const bookAmount = normalizeAmount(bookTxn.Amount);

    if (bankAmount !== bookAmount) {
      amountMismatch.push({
        reference: ref,
        bankAmount,
        bookAmount,
        difference: bankAmount - bookAmount,
        bankRecord: bankTxn,
        bookRecord: bookTxn,
      });

      bookMap.delete(ref);
      return;
    }

    matched.push({
      reference: ref,
      amount: bankAmount,
      bankRecord: bankTxn,
      bookRecord: bookTxn,
    });

    bookMap.delete(ref);
  });

  missingInBank.push(...bookMap.values());

  const reconciliationRate =
    bank.length === 0
      ? 0
      : Number(((matched.length / bank.length) * 100).toFixed(2));

  return {
    summary: {
      totalBankTransactions: bank.length,
      totalBookTransactions: books.length,
      matched: matched.length,
      missingInBooks: missingInBooks.length,
      missingInBank: missingInBank.length,
      amountMismatch: amountMismatch.length,
      reconciliationRate: reconciliationRate + "%",
    },

    matched,
    missingInBooks,
    missingInBank,
    amountMismatch,
  };
}
    
    
    `,
  },
  {
    id: "fn_gst_reconciliation",
    code: function gstReconciliation(booksCsv: string, gstCsv: string) {
      function csvToJson(csv: string) {
        const lines = csv.trim().split("\\n");
        const headers = lines[0].split(",").map((h) => h.trim());
        return lines.slice(1).map((line) => {
          const values = line.split(",");
          return headers.reduce((obj: any, header: any, index) => {
            obj[header] = values[index]?.trim();
            return obj;
          }, {});
        });
      }
      const books = csvToJson(booksCsv);
      const gst = csvToJson(gstCsv);
      const gstMap = new Map();
      gst.forEach((item) => gstMap.set(item.InvoiceNo, item));
      const matched: any = [];
      const missingInGST: any = [];
      const taxableMismatch: any = [];
      const gstMismatch: any = [];
      books.forEach((bookInvoice) => {
        const gstInvoice = gstMap.get(bookInvoice.InvoiceNo);
        if (!gstInvoice) {
          missingInGST.push(bookInvoice);
          return;
        }
        if (
          Number(bookInvoice.TaxableAmount) !== Number(gstInvoice.TaxableAmount)
        ) {
          taxableMismatch.push({
            invoiceNo: bookInvoice.InvoiceNo,
            books: Number(bookInvoice.TaxableAmount),
            gst: Number(gstInvoice.TaxableAmount),
          });
        }
        if (Number(bookInvoice.GSTAmount) !== Number(gstInvoice.GSTAmount)) {
          gstMismatch.push({
            invoiceNo: bookInvoice.InvoiceNo,
            books: Number(bookInvoice.GSTAmount),
            gst: Number(gstInvoice.GSTAmount),
          });
        }
        matched.push(bookInvoice);
        gstMap.delete(bookInvoice.InvoiceNo);
      });
      const missingInBooks = Array.from(gstMap.values());
      return {
        summary: {
          matched: matched.length,
          missingInGST: missingInGST.length,
          missingInBooks: missingInBooks.length,
          taxableMismatch: taxableMismatch.length,
          gstMismatch: gstMismatch.length,
        },
        matched,
        missingInGST,
        missingInBooks,
        taxableMismatch,
        gstMismatch,
      };
    },
    tags: ["accountant", "ca", "gst", "tax", "audit", "reconciliation"],
    name: "GST Reconciliation",
    details:
      "GST Reconciliation compares invoices recorded in accounting books against invoices reported in GST returns. It identifies missing invoices, duplicate invoices, taxable amount mismatches, GST mismatches, and invoices that exist in one source but not the other. This process is commonly performed before GST filing, during audits, and during monthly or quarterly financial reviews.",
    whyUse:
      "Manually comparing hundreds or thousands of invoices between accounting software and GST returns is extremely time consuming. This function automatically matches invoices using invoice numbers and identifies discrepancies that could lead to tax filing errors, notices, incorrect GST payments, or audit issues.",
    saveTime: "4-12 hours",
    inputType: ["csv"],
    outputType: ["json"],
    useCases: [
      {
        title: "Monthly GST Filing",
        description:
          "Verify all invoices in accounting software are reported correctly in GST returns.",
        input: {
          booksCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV001,10000,1800"],
          gstCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV001,10000,1800"],
        },
        output: {
          matched: 1,
          missingInGST: 0,
          missingInBooks: 0,
        },
      },
      {
        title: "Missing Invoice Detection",
        description:
          "Identify invoices recorded in books but missing from GST returns.",
        input: {
          booksCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV100,5000,900"],
          gstCsv: ["InvoiceNo,TaxableAmount,GSTAmount"],
        },
        output: {
          missingInGST: 1,
        },
      },
      {
        title: "GST Amount Verification",
        description: "Detect GST amount mismatches before filing returns.",
        input: {
          booksCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV200,10000,1800"],
          gstCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV200,10000,1500"],
        },
        output: {
          gstMismatch: 1,
        },
      },
    ],
    functionArgs: ["booksCsv", "gstCsv"],
    functionBody:
      'function csvToJson2(csv) {\n        const lines = csv.trim().split("\\\\n");\n        const headers = lines[0].split(",").map((h) => h.trim());\n        return lines.slice(1).map((line) => {\n          const values = line.split(",");\n          return headers.reduce((obj, header, index) => {\n            obj[header] = values[index]?.trim();\n            return obj;\n          }, {});\n        });\n      }\n      const books = csvToJson2(booksCsv);\n      const gst = csvToJson2(gstCsv);\n      const gstMap = /* @__PURE__ */ new Map();\n      gst.forEach((item) => gstMap.set(item.InvoiceNo, item));\n      const matched = [];\n      const missingInGST = [];\n      const taxableMismatch = [];\n      const gstMismatch = [];\n      books.forEach((bookInvoice) => {\n        const gstInvoice = gstMap.get(bookInvoice.InvoiceNo);\n        if (!gstInvoice) {\n          missingInGST.push(bookInvoice);\n          return;\n        }\n        if (Number(bookInvoice.TaxableAmount) !== Number(gstInvoice.TaxableAmount)) {\n          taxableMismatch.push({\n            invoiceNo: bookInvoice.InvoiceNo,\n            books: Number(bookInvoice.TaxableAmount),\n            gst: Number(gstInvoice.TaxableAmount)\n          });\n        }\n        if (Number(bookInvoice.GSTAmount) !== Number(gstInvoice.GSTAmount)) {\n          gstMismatch.push({\n            invoiceNo: bookInvoice.InvoiceNo,\n            books: Number(bookInvoice.GSTAmount),\n            gst: Number(gstInvoice.GSTAmount)\n          });\n        }\n        matched.push(bookInvoice);\n        gstMap.delete(bookInvoice.InvoiceNo);\n      });\n      const missingInBooks = Array.from(gstMap.values());\n      return {\n        summary: {\n          matched: matched.length,\n          missingInGST: missingInGST.length,\n          missingInBooks: missingInBooks.length,\n          taxableMismatch: taxableMismatch.length,\n          gstMismatch: gstMismatch.length\n        },\n        matched,\n        missingInGST,\n        missingInBooks,\n        taxableMismatch,\n        gstMismatch\n      };',
  },
  {
    id: "fn_proposal_price_calculator",
    tags: ["freelancer", "agency", "consultant", "pricing", "proposal"],
    name: "Proposal Price Calculator",
    details:
      "Generate project quotations from estimated tasks. Reads a CSV containing tasks, hours and rates, then calculates project cost, risk buffer and profit margin.",
    whyUse:
      "Many freelancers estimate project pricing manually in spreadsheets. This often results in underpricing, forgotten tasks, or missing contingency buffers. The function automatically calculates a realistic quotation based on actual project effort.",
    saveTime: "30-60 minutes",
    inputType: ["csv"],
    outputType: ["json"],
    useCases: [
      {
        title: "Website Project",
        input: `Task,Hours,Rate 
                UI Design,10,20, 
                Frontend,20,20, 
                Backend,15,20 `,

        output: {
          tasks: 3,
          totalHours: 45,
          finalQuotation: 1188,
        },
      },
      {
        title: "Mobile App MVP",
        input: `Task,Hours,Rate
          Authentication,12,25
          Dashboard,18,25
          API Integration,15,25`,

        output: {
          tasks: 3,
          totalHours: 45,
          finalQuotation: 1485,
        },
      },
      {
        title: "Consulting Work",
        input: `Task,Hours,Rate,
          Research,8,30
          Planning,6,30
          Documentation,4,30`,

        output: {
          tasks: 3,
          totalHours: 18,
          finalQuotation: 713,
        },
      },
    ],
    functionArgs: ["csv", "riskPercent", "profitPercent"],
    functionBody:
      'const rows = csv.trim().split("\\n");\n      const headers = rows[0].split(",");\n      const data = rows.slice(1).map((row) => {\n        const values = row.split(",");\n        return headers.reduce((obj, h, i) => {\n          obj[h.trim()] = values[i]?.trim();\n          return obj;\n        }, {});\n      });\n      const totalHours = data.reduce(\n        (sum, row) => sum + Number(row.Hours || 0),\n        0\n      );\n      const baseCost = data.reduce(\n        (sum, row) => sum + Number(row.Hours || 0) * Number(row.Rate || 0),\n        0\n      );\n      const riskAmount = baseCost * riskPercent / 100;\n      const subtotal = baseCost + riskAmount;\n      const profitAmount = subtotal * profitPercent / 100;\n      return {\n        tasks: data.length,\n        totalHours,\n        baseCost,\n        riskAmount,\n        profitAmount,\n        finalQuotation: Math.round(subtotal + profitAmount)\n      };',

    code: function proposalPriceCalculator(
      csv: string,
      riskPercent = 10,
      profitPercent = 20,
    ) {
      const rows = csv.trim().split("\\n");
      const headers = rows[0].split(",");
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj: any, h: any, i: any) => {
          obj[h.trim()] = values[i]?.trim();
          return obj;
        }, {});
      });
      const totalHours = data.reduce(
        (sum, row) => sum + Number(row.Hours || 0),
        0,
      );
      const baseCost = data.reduce(
        (sum, row) => sum + Number(row.Hours || 0) * Number(row.Rate || 0),
        0,
      );
      const riskAmount = (baseCost * riskPercent) / 100;
      const subtotal = baseCost + riskAmount;
      const profitAmount = (subtotal * profitPercent) / 100;
      return {
        tasks: data.length,
        totalHours,
        baseCost,
        riskAmount,
        profitAmount,
        finalQuotation: Math.round(subtotal + profitAmount),
      };
    },
  },
  {
    id: "fn_deal_probability_analyzer",
    code: function dealProbabilityAnalyzer(csv: string) {
      const rows = csv.trim().split("\\n");
      const headers = rows[0].split(",");
      const deals = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj: any, h: any, i: number) => {
          obj[h.trim()] = values[i]?.trim();
          return obj;
        }, {});
      });
      return deals.map((deal) => {
        let score = 0;
        if (deal.Stage === "Proposal") score += 30;
        if (deal.Stage === "Negotiation") score += 50;
        if (deal.Stage === "Verbal Commitment") score += 70;
        if (deal.Budget === "Yes") score += 15;
        if (deal.DecisionMaker === "Yes") score += 10;
        if (deal.ProposalSent === "Yes") score += 10;
        if (Number(deal.LastResponseDays) <= 7) score += 15;
        return { ...deal, Probability: Math.min(score, 100) + "%" };
      });
    },
    tags: ["sales", "crm", "lead", "pipeline", "forecasting", "deal-analysis"],
    name: "Deal Probability Analyzer",
    details:
      "Analyze sales opportunities and estimate the probability of winning each deal based on deal stage, budget confirmation, decision-maker involvement, proposal status, and response activity. Generates a score and estimated close probability for forecasting and pipeline management.",
    whyUse:
      "Sales pipelines often contain dozens or hundreds of opportunities. Managers struggle to identify which deals are most likely to close. This function automatically scores opportunities using objective criteria and helps prioritize follow-ups, forecast revenue, and focus effort on high-probability deals.",
    saveTime: "1-3 hours per week",
    inputType: ["csv"],
    outputType: ["json"],
    useCases: [
      {
        title: "Agency Sales Pipeline",
        input: [
          "DealName,Stage,Budget,DecisionMaker,ProposalSent,LastResponseDays",
          "Website Project,Negotiation,Yes,Yes,Yes,2",
          "Mobile App,Proposal,No,Yes,Yes,10",
        ],
        output: [
          {
            DealName: "Website Project",
            Probability: "90%",
          },
          {
            DealName: "Mobile App",
            Probability: "50%",
          },
        ],
      },
      {
        title: "Freelance Project Leads",
        input: [
          "DealName,Stage,Budget,DecisionMaker,ProposalSent,LastResponseDays",
          "CRM Development,Proposal,Yes,Yes,Yes,5",
        ],
        output: [
          {
            DealName: "CRM Development",
            Probability: "70%",
          },
        ],
      },
      {
        title: "B2B SaaS Sales Forecast",
        input: [
          "DealName,Stage,Budget,DecisionMaker,ProposalSent,LastResponseDays",
          "Enterprise License,Verbal Commitment,Yes,Yes,Yes,1",
        ],
        output: [
          {
            DealName: "Enterprise License",
            Probability: "100%",
          },
        ],
      },
    ],
    functionArgs: ["csv"],
    functionBody:
      'const rows = csv.trim().split("\\\\n");\n      const headers = rows[0].split(",");\n      const deals = rows.slice(1).map((row) => {\n        const values = row.split(",");\n        return headers.reduce((obj, h, i) => {\n          obj[h.trim()] = values[i]?.trim();\n          return obj;\n        }, {});\n      });\n      return deals.map((deal) => {\n        let score = 0;\n        if (deal.Stage === "Proposal") score += 30;\n        if (deal.Stage === "Negotiation") score += 50;\n        if (deal.Stage === "Verbal Commitment") score += 70;\n        if (deal.Budget === "Yes") score += 15;\n        if (deal.DecisionMaker === "Yes") score += 10;\n        if (deal.ProposalSent === "Yes") score += 10;\n        if (Number(deal.LastResponseDays) <= 7) score += 15;\n        return { ...deal, Probability: Math.min(score, 100) + "%" };\n      });',
  },
  {
    id: "fn_lead_deduplicator",
    code: function leadDeduplicator(csv: string) {
      const rows = csv.trim().split("\\n");
      const headers = rows[0].split(",");
      const leads = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj: any, h: any, i: number) => {
          obj[h.trim()] = values[i]?.trim();
          return obj;
        }, {});
      });
      const unique: any = [];
      const duplicates: any = [];
      const seen = new Set();
      leads.forEach((lead) => {
        const email = (lead.Email || "").toLowerCase();
        const phone = (lead.Phone || "").replace(/\\D/g, "");
        const key = email || phone;
        if (seen.has(key)) {
          duplicates.push(lead);
        } else {
          seen.add(key);
          unique.push(lead);
        }
      });
      return {
        summary: {
          totalRecords: leads.length,
          uniqueRecords: unique.length,
          duplicateRecords: duplicates.length,
        },
        unique,
        duplicates,
      };
    },
    tags: ["sales", "crm", "marketing", "lead-management", "data-cleaning"],
    name: "Lead Deduplicator",
    details:
      "Identify and remove duplicate leads from CRM exports, marketing lists, and sales spreadsheets. The function compares records using email addresses and phone numbers, then returns a clean list of unique leads along with duplicate records found during analysis.",
    whyUse:
      "Duplicate leads waste sales time, inflate pipeline metrics, increase email marketing costs, and create poor customer experiences. Sales teams often import leads from multiple sources such as Facebook Ads, LinkedIn, website forms, events, and referrals. This function automatically detects duplicate contacts and helps maintain a clean CRM.",
    saveTime: "1-4 hours per lead import",
    inputType: ["csv"],
    outputType: ["json"],
    useCases: [
      {
        title: "CRM Import Cleanup",
        input: [
          "Name,Email,Phone",
          "John Doe,john@gmail.com,9876543210",
          "John Doe,john@gmail.com,9876543210",
        ],
        output: {
          totalRecords: 2,
          uniqueRecords: 1,
          duplicateRecords: 1,
        },
      },
      {
        title: "Marketing Email List Cleanup",
        input: [
          "Name,Email,Phone",
          "Alice,alice@gmail.com,1111111111",
          "Alice Smith,Alice@gmail.com,1111111111",
        ],
        output: {
          uniqueRecords: 1,
          duplicateRecords: 1,
        },
      },
      {
        title: "Multi-Source Lead Consolidation",
        input: [
          "Name,Email,Phone",
          "Rahul,rahul@test.com,9999999999",
          "Rahul Kumar,rahul@test.com,8888888888",
          "Rahul,other@test.com,9999999999",
        ],
        output: {
          uniqueRecords: 1,
          duplicateRecords: 2,
        },
      },
    ],
    functionArgs: ["csv"],
    functionBody:
      'const rows = csv.trim().split("\\\\n");\n      const headers = rows[0].split(",");\n      const leads = rows.slice(1).map((row) => {\n        const values = row.split(",");\n        return headers.reduce((obj, h, i) => {\n          obj[h.trim()] = values[i]?.trim();\n          return obj;\n        }, {});\n      });\n      const unique = [];\n      const duplicates = [];\n      const seen = /* @__PURE__ */ new Set();\n      leads.forEach((lead) => {\n        const email = (lead.Email || "").toLowerCase();\n        const phone = (lead.Phone || "").replace(/\\\\D/g, "");\n        const key = email || phone;\n        if (seen.has(key)) {\n          duplicates.push(lead);\n        } else {\n          seen.add(key);\n          unique.push(lead);\n        }\n      });\n      return {\n        summary: {\n          totalRecords: leads.length,\n          uniqueRecords: unique.length,\n          duplicateRecords: duplicates.length\n        },\n        unique,\n        duplicates\n      };',
  },
  {
    id: "fn_schema_to_dto",
    code: (schemaCode: string) => {
      const classMatch = schemaCode.match(/export\s+class\s+(\w+)/);

      if (!classMatch) {
        throw new Error("Schema class not found");
      }

      const className = classMatch[1];

      const propertyRegex =
        /@Prop\s*\(\s*([\s\S]*?)\s*\)\s*([\w]+)\s*:\s*([^;]+);/g;

      const validators = new Set();
      let dtoFields = "";
      let match;

      while ((match = propertyRegex.exec(schemaCode)) !== null) {
        const propOptions = match[1] || "";
        const fieldName = match[2];
        const fieldType = match[3].trim();

        const required = propOptions.includes("required: true");

        let dtoType = "any";
        let fieldValidators = [];

        if (
          fieldType === "string" ||
          fieldType === "String" ||
          fieldType.includes("ObjectId")
        ) {
          dtoType = "string";
          fieldValidators.push("@IsString()");
          validators.add("IsString");
        } else if (fieldType === "number" || fieldType === "Number") {
          dtoType = "number";
          fieldValidators.push("@IsNumber()");
          validators.add("IsNumber");
        } else if (fieldType === "boolean" || fieldType === "Boolean") {
          dtoType = "boolean";
          fieldValidators.push("@IsBoolean()");
          validators.add("IsBoolean");
        }

        if (!required) {
          fieldValidators.unshift("@IsOptional()");
          validators.add("IsOptional");
        }

        dtoFields += `
  @ApiPropertyOptional({
    example: "${fieldName}"
  })
  ${fieldValidators.join("\n  ")}
  ${fieldName}${required ? "" : "?"}: ${dtoType};
`;
      }

      return `import { ApiPropertyOptional } from "@nestjs/swagger";
import { ${Array.from(validators).join(", ")} } from "class-validator";

export class Create${className}Dto {
${dtoFields}
}`;
    },
    tags: [
      "developer",
      "nestjs",
      "mongoose",
      "dto",
      "swagger",
      "class-validator",
      "code-generator",
    ],
    name: "Schema To DTO",
    details:
      "Generate a NestJS CreateDto class from a Mongoose schema. The function reads @Prop decorators, determines field types, required fields, and automatically generates Swagger and class-validator decorators.",
    whyUse:
      "Creating DTOs manually is repetitive and error-prone. Every time a schema changes, developers must update validators, Swagger decorators, and TypeScript types. This function automates DTO generation and ensures consistency between schemas and DTOs.",
    saveTime: "15-60 minutes per DTO",
    functionArgs: ["schemaCode"],
    functionBody:
      'const classMatch = schemaCode.match(/export\\s+class\\s+(\\w+)/);\n      if (!classMatch) {\n        throw new Error("Schema class not found");\n      }\n      const className = classMatch[1];\n      const propertyRegex = /@Prop\\s*\\(\\s*([\\s\\S]*?)\\s*\\)\\s*([\\w]+)\\s*:\\s*([^;]+);/g;\n      const validators = /* @__PURE__ */ new Set();\n      let dtoFields = "";\n      let match;\n      while ((match = propertyRegex.exec(schemaCode)) !== null) {\n        const propOptions = match[1] || "";\n        const fieldName = match[2];\n        const fieldType = match[3].trim();\n        const required = propOptions.includes("required: true");\n        let dtoType = "any";\n        let fieldValidators = [];\n        if (fieldType === "string" || fieldType === "String" || fieldType.includes("ObjectId")) {\n          dtoType = "string";\n          fieldValidators.push("@IsString()");\n          validators.add("IsString");\n        } else if (fieldType === "number" || fieldType === "Number") {\n          dtoType = "number";\n          fieldValidators.push("@IsNumber()");\n          validators.add("IsNumber");\n        } else if (fieldType === "boolean" || fieldType === "Boolean") {\n          dtoType = "boolean";\n          fieldValidators.push("@IsBoolean()");\n          validators.add("IsBoolean");\n        }\n        if (!required) {\n          fieldValidators.unshift("@IsOptional()");\n          validators.add("IsOptional");\n        }\n        dtoFields += `\n  @ApiPropertyOptional({\n    example: "${fieldName}"\n  })\n  ${fieldValidators.join("\\n  ")}\n  ${fieldName}${required ? "" : "?"}: ${dtoType};\n`;\n      }\n      return `import { ApiPropertyOptional } from "@nestjs/swagger";\nimport { ${Array.from(validators).join(", ")} } from "class-validator";\n\nexport class Create${className}Dto {\n${dtoFields}\n}`;',
    outputType: ["typescript"],
    useCases: [
      {
        title: "Generate User DTO",
        input: {
          schemaCode:
            "\nexport class User {\n  @Prop({ required: true })\n  name: string;\n\n  @Prop()\n  email: string;\n}\n",
        },
        output:
          "\nexport class CreateUserDto {\n  @IsString()\n  name: string;\n\n  @IsOptional()\n  @IsString()\n  email?: string;\n}\n",
      },
      {
        title: "Generate Product DTO",
        input: {
          schemaCode:
            "\nexport class Product {\n  @Prop({ required: true })\n  title: string;\n\n  @Prop()\n  price: number;\n}\n",
        },
        output: "CreateProductDto",
      },
      {
        title: "Generate Order DTO",
        input: {
          schemaCode:
            "\nexport class Order {\n  @Prop({ required: true })\n  orderNumber: string;\n\n  @Prop()\n  isPaid: boolean;\n}\n",
        },
        output: "CreateOrderDto",
      },
    ],
  },
];

export const liblist_pre1 = [
  {
    id: "fn_remove_duplicate_lines",
    tags: ["developer", "text", "cleanup"],
    name: "Remove Duplicate Lines",
    details: "Remove duplicate lines while preserving order.",
    whyUse: "Useful for cleaning logs, emails, exported reports, and datasets.",
    saveTime: "10-20 minutes of manual cleanup",
    code: function removeDuplicateLines(text: string) {
      return [...new Set(text.split("\\n"))].join("\\n");
    },
    useCases: [
      {
        input: "apple\napple\nbanana",
        output: "apple\nbanana",
      },
    ],
    functionArgs: ["text"],
    functionBody: "return [...new Set(text.split('\\n'))].join('\\n');",
    inputType: [],
    outputType: [],
  },
  {
    id: "fn_csv_to_json",
    tags: ["developer", "csv", "json", "data"],
    name: "CSV To JSON",
    details: "Convert CSV rows into JSON objects.",
    whyUse: "Most APIs require JSON while exported files are often CSV.",
    saveTime: "15-30 minutes of manual conversion",
    code: function csvToJson(csv: string) {
      const rows = csv.trim().split("\\n");
      const headers = rows[0].split(",");
      return rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj: any, h: any, i: number) => {
          obj[h.trim()] = values[i]?.trim();
          return obj;
        }, {});
      });
    },
    useCases: [
      {
        input: "name,age\nKripa,24",
        output: [
          {
            name: "Kripa",
            age: "24",
          },
        ],
      },
    ],
    functionArgs: [
      "function csvToJson(csv){ const rows = csv.trim().split('\\n'); const headers = rows[0].split('",
      "'); return rows.slice(1).map(row",
    ],
    functionBody:
      "const values = row.split(','); return headers.reduce((obj,h,i)=>{ obj[h.trim()] = values[i]?.trim(); return obj; },{}); });",
    inputType: [],
    outputType: [],
  },

  {
    id: "fn_jwt_decoder",
    tags: ["developer", "jwt", "authentication", "security"],
    name: "JWT Decoder",
    details: "Decode JWT token payload and header.",
    whyUse: "Inspect token contents without writing temporary code.",
    saveTime: "10-15 minutes every authentication debugging session",
    code: function jwtDecoder(token: string) {
      const [header, payload] = token.split(".");
      return {
        header: JSON.parse(atob(header)),
        payload: JSON.parse(atob(payload)),
      };
    },
    useCases: {
      input: "eyJhbGciOiJIUzI1NiIs...",
      output: [
        {
          userId: 1,
          role: "admin",
        },
      ],
    },
    functionArgs: ["token"],
    functionBody:
      "const [header,payload] = token.split('.'); return { header: JSON.parse(atob(header)), payload: JSON.parse(atob(payload)) };",
    inputType: [],
    outputType: [],
  },
  {
    id: "fn_json_formatter",
    tags: ["developer", "json", "api", "formatter"],
    name: "JSON Formatter",
    details: "Convert minified JSON into readable formatted JSON.",
    whyUse:
      "Developers frequently receive compact API responses that are difficult to read.",
    saveTime: "5-10 minutes per debugging session",
    code: function jsonFormatter(jsonString: string) {
      return JSON.stringify(JSON.parse(jsonString), null, 2);
    },
    useCases: [
      {
        input: '{"name":"Kripa","age":24}',
        output: '{\n  "name": "Kripa",\n  "age": 24\n}',
      },
    ],
    functionArgs: ["jsonString"],
    functionBody: "return JSON.stringify(JSON.parse(jsonString), null, 2);",
    inputType: [],
    outputType: [],
  },
  {
    id: "6ab07d0d-9b48-4ffa-83aa-77fc23ed44c1",
    name: "tee2",
    tags: [],
    details: "",
    whyUse: "",
    saveTime: "",
    functionArgs: ["bankCsv", "booksCsv"],
    inputType: [],
    outputType: [],
    useCases: [],
    functionBody:
      'function csvToJson(csv) {\n    const lines = csv.trim().split("\\n");\n\n    const headers = lines[0]\n      .split(",")\n      .map((h) => h.trim());\n\n    return lines.slice(1).map((line) => {\n      const values = line.split(",");\n\n      return headers.reduce((obj, header, index) => {\n        obj[header] = values[index]?.trim();\n        return obj;\n      }, {});\n    });\n  }\n\n  const bank = csvToJson(bankCsv);\n  const books = csvToJson(booksCsv);\n\n  const matched = [];\n  const missingInBooks = [];\n  const amountMismatch = [];\n\n  const bookMap = new Map();\n\n  books.forEach((item) => {\n    bookMap.set(item.Reference, item);\n  });\n\n  bank.forEach((bankTxn) => {\n    const bookTxn = bookMap.get(\n      bankTxn.Reference\n    );\n\n    if (!bookTxn) {\n      missingInBooks.push(bankTxn);\n      return;\n    }\n\n    if (\n      Number(bankTxn.Amount) !==\n      Number(bookTxn.Amount)\n    ) {\n      amountMismatch.push({\n        reference: bankTxn.Reference,\n        bankAmount: Number(bankTxn.Amount),\n        bookAmount: Number(bookTxn.Amount)\n      });\n\n      return;\n    }\n\n    matched.push(bankTxn);\n\n    bookMap.delete(bankTxn.Reference);\n  });\n\n  const missingInBank =\n    Array.from(bookMap.values());\n\n  return {\n    summary: {\n      matched: matched.length,\n      missingInBooks:\n        missingInBooks.length,\n      missingInBank:\n        missingInBank.length,\n      amountMismatch:\n        amountMismatch.length\n    },\n    matched,\n    missingInBooks,\n    missingInBank,\n    amountMismatch\n  };',
    code: function bankReconciliation(bankCsv: string, booksCsv: string) {
      function csvToJson(csv: string) {
        const lines = csv.trim().split("\\n");
        const headers = lines[0].split(",").map((h) => h.trim());
        return lines.slice(1).map((line) => {
          const values = line.split(",");
          return headers.reduce((obj: any, header: any, index: any) => {
            obj[header] = values[index]?.trim();
            return obj;
          }, {});
        });
      }
      const bank = csvToJson(bankCsv);
      const books = csvToJson(booksCsv);
      const matched: any = [];
      const missingInBooks: any = [];
      const amountMismatch: any = [];
      const bookMap = new Map();
      books.forEach((item) => {
        bookMap.set(item.Reference, item);
      });
      bank.forEach((bankTxn) => {
        const bookTxn = bookMap.get(bankTxn.Reference);
        if (!bookTxn) {
          missingInBooks.push(bankTxn);
          return;
        }
        if (Number(bankTxn.Amount) !== Number(bookTxn.Amount)) {
          amountMismatch.push({
            reference: bankTxn.Reference,
            bankAmount: Number(bankTxn.Amount),
            bookAmount: Number(bookTxn.Amount),
          });
          return;
        }
        matched.push(bankTxn);
        bookMap.delete(bankTxn.Reference);
      });
      const missingInBank = Array.from(bookMap.values());
      return {
        summary: {
          matched: matched.length,
          missingInBooks: missingInBooks.length,
          missingInBank: missingInBank.length,
          amountMismatch: amountMismatch.length,
        },
        matched,
        missingInBooks,
        missingInBank,
        amountMismatch,
      };
    },
    createdAt: 1780478859237,
    notes: "efcw",
  },
  {
    createdAt: 1780478859237,
    functionArgs: ["bankCsv", "booksCsv"],
    functionBody:
      "function csvToJson(csv) {   const lines = csv.trim().split('\\n');\n    const headers = lines[0].split(',').map(h => h.trim());\n\n    return lines.slice(1).map(line => {\n      const values = line.split(',');\n\n      return headers.reduce((obj, header, index) => {\n        obj[header] = values[index]?.trim();\n        return obj;\n      }, {});\n    });\n  }\n\n  const bank = csvToJson(bankCsv);\n  const books = csvToJson(booksCsv);\n\n  const matched = [];\n  const missingInBooks = [];\n  const amountMismatch = [];\n\n  const bookMap = new Map();\n\n  books.forEach(item => {\n    bookMap.set(item.Reference, item);\n  });\n\n  bank.forEach(bankTxn => {\n    const bookTxn = bookMap.get(bankTxn.Reference);\n\n    if (!bookTxn) {\n      missingInBooks.push(bankTxn);\n      return;\n    }\n\n    if (Number(bankTxn.Amount) !== Number(bookTxn.Amount)) {\n      amountMismatch.push({\n        reference: bankTxn.Reference,\n        bankAmount: Number(bankTxn.Amount),\n        bookAmount: Number(bookTxn.Amount)\n      });\n      return;\n    }\n\n    matched.push(bankTxn);\n\n    bookMap.delete(bankTxn.Reference);\n  });\n\n  const missingInBank = Array.from(bookMap.values());\n\n  return {\n    summary: {\n      matched: matched.length,\n      missingInBooks: missingInBooks.length,\n      missingInBank: missingInBank.length,\n      amountMismatch: amountMismatch.length\n    },\n    matched,\n    missingInBooks,\n    missingInBank,\n    amountMismatch\n  };",
    id: "fn_bank_reconciliation",
    tags: ["accountant", "ca", "finance", "audit", "banking", "reconciliation"],
    name: "Bank Reconciliation",
    details:
      "Bank Reconciliation compares transactions recorded in accounting books against transactions appearing in the bank statement. It automatically identifies matched transactions, transactions missing in accounting records, transactions missing in bank records, and amount mismatches. This process is commonly performed during monthly closing, audits, tax filing, and financial reviews to ensure accounting records accurately reflect actual bank activity.",
    whyUse:
      "Manually comparing hundreds or thousands of bank transactions against accounting records is time-consuming and error-prone. This function automates reconciliation by matching transactions using references and amounts, helping accountants quickly identify missing entries, duplicate postings, bank charges not recorded in books, incorrect amounts, and other discrepancies. It significantly reduces reconciliation time and improves accuracy during audits and financial reporting.",
    saveTime: "2-8 hours",
    inputType: ["csv"],
    outputType: ["json"],
    code: (bankCsv: string, booksCsv: string) => {
      function csvToJson(csv: string) {
        const lines = csv.trim().split("\n").filter(Boolean);

        const headers = lines[0].split(",").map((h) => h.trim());

        return lines.slice(1).map((line) => {
          const values = line.split(",");

          return headers.reduce((obj: any, header: any, index: any) => {
            obj[header] = values[index]?.trim() || "";
            return obj;
          }, {});
        });
      }

      function normalizeAmount(amount: number) {
        return Number(String(amount).replace(/,/g, "").trim());
      }

      const bank = csvToJson(bankCsv);
      const books = csvToJson(booksCsv);

      const matched: any[] = [];
      const missingInBooks: any[] = [];
      const missingInBank: any[] = [];
      const amountMismatch: any[] = [];

      const bookMap = new Map();

      books.forEach((bookTxn) => {
        const ref = bookTxn.Reference?.trim();

        if (!ref) return;

        bookMap.set(ref, bookTxn);
      });

      bank.forEach((bankTxn) => {
        const ref = bankTxn.Reference?.trim();

        const bookTxn = bookMap.get(ref);

        if (!bookTxn) {
          missingInBooks.push(bankTxn);
          return;
        }

        const bankAmount = normalizeAmount(bankTxn.Amount);

        const bookAmount = normalizeAmount(bookTxn.Amount);

        if (bankAmount !== bookAmount) {
          amountMismatch.push({
            reference: ref,
            bankAmount,
            bookAmount,
            difference: bankAmount - bookAmount,
            bankRecord: bankTxn,
            bookRecord: bookTxn,
          });

          bookMap.delete(ref);

          return;
        }

        matched.push({
          reference: ref,
          amount: bankAmount,
          bankRecord: bankTxn,
          bookRecord: bookTxn,
        });

        bookMap.delete(ref);
      });

      missingInBank.push(...Array.from(bookMap.values()));

      const reconciliationRate =
        bank.length === 0
          ? 0
          : Number(((matched.length / bank.length) * 100).toFixed(2));

      return {
        summary: {
          totalBankTransactions: bank.length,
          totalBookTransactions: books.length,
          matched: matched.length,
          missingInBooks: missingInBooks.length,
          missingInBank: missingInBank.length,
          amountMismatch: amountMismatch.length,
          reconciliationRate: reconciliationRate + "%",
        },

        matched,
        missingInBooks,
        missingInBank,
        amountMismatch,
      };
    },
    useCases: [
      {
        title: "Monthly Book Closing",
        description:
          "Reconcile accounting books against bank statements before month-end closing.",
        input: {
          bankCsv: "Date,Reference,Amount\n2025-01-01,TXN001,1000",
          booksCsv: "Date,Reference,Amount\n2025-01-01,TXN001,1000",
        },
        output: {
          matched: 1,
          missingInBooks: 0,
          missingInBank: 0,
          amountMismatch: 0,
        },
      },
      {
        title: "Detect Missing Book Entries",
        description:
          "Identify bank transactions that were never recorded in accounting software.",
        input: {
          bankCsv: "Date,Reference,Amount\n2025-01-01,TXN005,500",
          booksCsv: "Date,Reference,Amount",
        },
        output: {
          matched: 0,
          missingInBooks: 1,
          missingInBank: 0,
          amountMismatch: 0,
        },
      },
      {
        title: "Audit Verification",
        description:
          "Detect amount differences between bank and accounting records during audit reviews.",
        input: {
          bankCsv: "Date,Reference,Amount\n2025-01-01,TXN010,1000",
          booksCsv: "Date,Reference,Amount\n2025-01-01,TXN010,1200",
        },
        output: {
          matched: 0,
          missingInBooks: 0,
          missingInBank: 0,
          amountMismatch: 1,
        },
      },
    ],
  },
  {
    id: "fn_gst_reconciliation",

    tags: ["accountant", "ca", "gst", "tax", "audit", "reconciliation"],
    name: "GST Reconciliation",
    details:
      "GST Reconciliation compares invoices recorded in accounting books against invoices reported in GST returns. It identifies missing invoices, duplicate invoices, taxable amount mismatches, GST mismatches, and invoices that exist in one source but not the other. This process is commonly performed before GST filing, during audits, and during monthly or quarterly financial reviews.",
    whyUse:
      "Manually comparing hundreds or thousands of invoices between accounting software and GST returns is extremely time consuming. This function automatically matches invoices using invoice numbers and identifies discrepancies that could lead to tax filing errors, notices, incorrect GST payments, or audit issues.",
    saveTime: "4-12 hours",
    inputType: ["csv"],
    outputType: ["json"],
    code: function gstReconciliation(booksCsv: string, gstCsv: string) {
      function csvToJson(csv: string) {
        const lines = csv.trim().split("\\n");
        const headers = lines[0].split(",").map((h) => h.trim());
        return lines.slice(1).map((line) => {
          const values = line.split(",");
          return headers.reduce((obj: any, header: any, index) => {
            obj[header] = values[index]?.trim();
            return obj;
          }, {});
        });
      }
      const books = csvToJson(booksCsv);
      const gst = csvToJson(gstCsv);
      const gstMap = new Map();
      gst.forEach((item) => gstMap.set(item.InvoiceNo, item));
      const matched: any = [];
      const missingInGST: any = [];
      const taxableMismatch: any = [];
      const gstMismatch: any = [];
      books.forEach((bookInvoice) => {
        const gstInvoice = gstMap.get(bookInvoice.InvoiceNo);
        if (!gstInvoice) {
          missingInGST.push(bookInvoice);
          return;
        }
        if (
          Number(bookInvoice.TaxableAmount) !== Number(gstInvoice.TaxableAmount)
        ) {
          taxableMismatch.push({
            invoiceNo: bookInvoice.InvoiceNo,
            books: Number(bookInvoice.TaxableAmount),
            gst: Number(gstInvoice.TaxableAmount),
          });
        }
        if (Number(bookInvoice.GSTAmount) !== Number(gstInvoice.GSTAmount)) {
          gstMismatch.push({
            invoiceNo: bookInvoice.InvoiceNo,
            books: Number(bookInvoice.GSTAmount),
            gst: Number(gstInvoice.GSTAmount),
          });
        }
        matched.push(bookInvoice);
        gstMap.delete(bookInvoice.InvoiceNo);
      });
      const missingInBooks = Array.from(gstMap.values());
      return {
        summary: {
          matched: matched.length,
          missingInGST: missingInGST.length,
          missingInBooks: missingInBooks.length,
          taxableMismatch: taxableMismatch.length,
          gstMismatch: gstMismatch.length,
        },
        matched,
        missingInGST,
        missingInBooks,
        taxableMismatch,
        gstMismatch,
      };
    },
    useCases: [
      {
        title: "Monthly GST Filing",
        description:
          "Verify all invoices in accounting software are reported correctly in GST returns.",
        input: {
          booksCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV001,10000,1800"],
          gstCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV001,10000,1800"],
        },
        output: {
          matched: 1,
          missingInGST: 0,
          missingInBooks: 0,
        },
      },
      {
        title: "Missing Invoice Detection",
        description:
          "Identify invoices recorded in books but missing from GST returns.",
        input: {
          booksCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV100,5000,900"],
          gstCsv: ["InvoiceNo,TaxableAmount,GSTAmount"],
        },
        output: {
          missingInGST: 1,
        },
      },
      {
        title: "GST Amount Verification",
        description: "Detect GST amount mismatches before filing returns.",
        input: {
          booksCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV200,10000,1800"],
          gstCsv: ["InvoiceNo,TaxableAmount,GSTAmount", "INV200,10000,1500"],
        },
        output: {
          gstMismatch: 1,
        },
      },
    ],
    functionArgs: [
      "function gstReconciliation(booksCsv",
      "gstCsv){function csvToJson(csv){const lines=csv.trim().split('\\n');const headers=lines[0].split('",
      "').map(h",
    ],
    functionBody:
      "return h.trim());return lines.slice(1).map(line=>{const values=line.split(',');return headers.reduce((obj,header,index)=>{obj[header]=values[index]?.trim();return obj;},{});});}const books=csvToJson(booksCsv);const gst=csvToJson(gstCsv);const gstMap=new Map();gst.forEach(item=>gstMap.set(item.InvoiceNo,item));const matched=[];const missingInGST=[];const taxableMismatch=[];const gstMismatch=[];books.forEach(bookInvoice=>{const gstInvoice=gstMap.get(bookInvoice.InvoiceNo);if(!gstInvoice){missingInGST.push(bookInvoice);return;}if(Number(bookInvoice.TaxableAmount)!==Number(gstInvoice.TaxableAmount)){taxableMismatch.push({invoiceNo:bookInvoice.InvoiceNo,books:Number(bookInvoice.TaxableAmount),gst:Number(gstInvoice.TaxableAmount)});}if(Number(bookInvoice.GSTAmount)!==Number(gstInvoice.GSTAmount)){gstMismatch.push({invoiceNo:bookInvoice.InvoiceNo,books:Number(bookInvoice.GSTAmount),gst:Number(gstInvoice.GSTAmount)});}matched.push(bookInvoice);gstMap.delete(bookInvoice.InvoiceNo);});const missingInBooks=Array.from(gstMap.values());return {summary:{matched:matched.length,missingInGST:missingInGST.length,missingInBooks:missingInBooks.length,taxableMismatch:taxableMismatch.length,gstMismatch:gstMismatch.length},matched,missingInGST,missingInBooks,taxableMismatch,gstMismatch};}",
  },
  {
    id: "fn_proposal_price_calculator",
    tags: ["freelancer", "agency", "consultant", "pricing", "proposal"],
    name: "Proposal Price Calculator",
    details:
      "Generate project quotations from estimated tasks. Reads a CSV containing tasks, hours and rates, then calculates project cost, risk buffer and profit margin.",
    whyUse:
      "Many freelancers estimate project pricing manually in spreadsheets. This often results in underpricing, forgotten tasks, or missing contingency buffers. The function automatically calculates a realistic quotation based on actual project effort.",
    saveTime: "30-60 minutes",
    inputType: ["csv"],
    outputType: ["json"],
    code: function proposalPriceCalculator(
      csv: string,
      riskPercent = 10,
      profitPercent = 20,
    ) {
      const rows = csv.trim().split("\\n");
      const headers = rows[0].split(",");
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj: any, h: any, i: any) => {
          obj[h.trim()] = values[i]?.trim();
          return obj;
        }, {});
      });
      const totalHours = data.reduce(
        (sum, row) => sum + Number(row.Hours || 0),
        0,
      );
      const baseCost = data.reduce(
        (sum, row) => sum + Number(row.Hours || 0) * Number(row.Rate || 0),
        0,
      );
      const riskAmount = (baseCost * riskPercent) / 100;
      const subtotal = baseCost + riskAmount;
      const profitAmount = (subtotal * profitPercent) / 100;
      return {
        tasks: data.length,
        totalHours,
        baseCost,
        riskAmount,
        profitAmount,
        finalQuotation: Math.round(subtotal + profitAmount),
      };
    },
    useCases: [
      {
        title: "Website Project",
        input: `Task,Hours,Rate \n,
          UI Design,10,20 \n,
          Frontend,20,20 \n,
          Backend,15,20 `,

        output: {
          tasks: 3,
          totalHours: 45,
          finalQuotation: 1188,
        },
      },
      {
        title: "Mobile App MVP",
        input: [
          "Task,Hours,Rate",
          "Authentication,12,25",
          "Dashboard,18,25",
          "API Integration,15,25",
        ],
        output: {
          tasks: 3,
          totalHours: 45,
          finalQuotation: 1485,
        },
      },
      {
        title: "Consulting Work",
        input: [
          "Task,Hours,Rate",
          "Research,8,30",
          "Planning,6,30",
          "Documentation,4,30",
        ],
        output: {
          tasks: 3,
          totalHours: 18,
          finalQuotation: 713,
        },
      },
    ],
    functionArgs: [
      "function proposalPriceCalculator(csv",
      "riskPercent=10",
      "profitPercent=20){const rows=csv.trim().split('\\n');const headers=rows[0].split('",
      "');const data=rows.slice(1).map(row",
    ],
    functionBody:
      "const values=row.split(',');return headers.reduce((obj,h,i)=>{obj[h.trim()]=values[i]?.trim();return obj;},{});});const totalHours=data.reduce((sum,row)=>sum+Number(row.Hours||0),0);const baseCost=data.reduce((sum,row)=>sum+(Number(row.Hours||0)*Number(row.Rate||0)),0);const riskAmount=(baseCost*riskPercent)/100;const subtotal=baseCost+riskAmount;const profitAmount=(subtotal*profitPercent)/100;return {tasks:data.length,totalHours,baseCost,riskAmount,profitAmount,finalQuotation:Math.round(subtotal+profitAmount)};",
  },
  {
    id: "fn_deal_probability_analyzer",
    tags: ["sales", "crm", "lead", "pipeline", "forecasting", "deal-analysis"],
    name: "Deal Probability Analyzer",
    details:
      "Analyze sales opportunities and estimate the probability of winning each deal based on deal stage, budget confirmation, decision-maker involvement, proposal status, and response activity. Generates a score and estimated close probability for forecasting and pipeline management.",
    whyUse:
      "Sales pipelines often contain dozens or hundreds of opportunities. Managers struggle to identify which deals are most likely to close. This function automatically scores opportunities using objective criteria and helps prioritize follow-ups, forecast revenue, and focus effort on high-probability deals.",
    saveTime: "1-3 hours per week",
    inputType: ["csv"],
    outputType: ["json"],
    code: function dealProbabilityAnalyzer(csv: string) {
      const rows = csv.trim().split("\\n");
      const headers = rows[0].split(",");
      const deals = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj: any, h: any, i: number) => {
          obj[h.trim()] = values[i]?.trim();
          return obj;
        }, {});
      });
      return deals.map((deal) => {
        let score = 0;
        if (deal.Stage === "Proposal") score += 30;
        if (deal.Stage === "Negotiation") score += 50;
        if (deal.Stage === "Verbal Commitment") score += 70;
        if (deal.Budget === "Yes") score += 15;
        if (deal.DecisionMaker === "Yes") score += 10;
        if (deal.ProposalSent === "Yes") score += 10;
        if (Number(deal.LastResponseDays) <= 7) score += 15;
        return { ...deal, Probability: Math.min(score, 100) + "%" };
      });
    },
    useCases: [
      {
        title: "Agency Sales Pipeline",
        input: [
          "DealName,Stage,Budget,DecisionMaker,ProposalSent,LastResponseDays",
          "Website Project,Negotiation,Yes,Yes,Yes,2",
          "Mobile App,Proposal,No,Yes,Yes,10",
        ],
        output: [
          {
            DealName: "Website Project",
            Probability: "90%",
          },
          {
            DealName: "Mobile App",
            Probability: "50%",
          },
        ],
      },
      {
        title: "Freelance Project Leads",
        input: [
          "DealName,Stage,Budget,DecisionMaker,ProposalSent,LastResponseDays",
          "CRM Development,Proposal,Yes,Yes,Yes,5",
        ],
        output: [
          {
            DealName: "CRM Development",
            Probability: "70%",
          },
        ],
      },
      {
        title: "B2B SaaS Sales Forecast",
        input: [
          "DealName,Stage,Budget,DecisionMaker,ProposalSent,LastResponseDays",
          "Enterprise License,Verbal Commitment,Yes,Yes,Yes,1",
        ],
        output: [
          {
            DealName: "Enterprise License",
            Probability: "100%",
          },
        ],
      },
    ],
    functionArgs: [
      "function dealProbabilityAnalyzer(csv){const rows=csv.trim().split('\\n');const headers=rows[0].split('",
      "');const deals=rows.slice(1).map(row",
    ],
    functionBody:
      "const values=row.split(',');return headers.reduce((obj,h,i)=>{obj[h.trim()]=values[i]?.trim();return obj;},{});});return deals.map(deal=>{let score=0;if(deal.Stage==='Proposal')score+=30;if(deal.Stage==='Negotiation')score+=50;if(deal.Stage==='Verbal Commitment')score+=70;if(deal.Budget==='Yes')score+=15;if(deal.DecisionMaker==='Yes')score+=10;if(deal.ProposalSent==='Yes')score+=10;if(Number(deal.LastResponseDays)<=7)score+=15;return {...deal,Probability:Math.min(score,100)+'%'};});",
  },
  {
    id: "fn_lead_deduplicator",
    tags: ["sales", "crm", "marketing", "lead-management", "data-cleaning"],
    name: "Lead Deduplicator",
    details:
      "Identify and remove duplicate leads from CRM exports, marketing lists, and sales spreadsheets. The function compares records using email addresses and phone numbers, then returns a clean list of unique leads along with duplicate records found during analysis.",
    whyUse:
      "Duplicate leads waste sales time, inflate pipeline metrics, increase email marketing costs, and create poor customer experiences. Sales teams often import leads from multiple sources such as Facebook Ads, LinkedIn, website forms, events, and referrals. This function automatically detects duplicate contacts and helps maintain a clean CRM.",
    saveTime: "1-4 hours per lead import",
    inputType: ["csv"],
    outputType: ["json"],
    code: function leadDeduplicator(csv: string) {
      const rows = csv.trim().split("\\n");
      const headers = rows[0].split(",");
      const leads = rows.slice(1).map((row) => {
        const values = row.split(",");
        return headers.reduce((obj: any, h: any, i: number) => {
          obj[h.trim()] = values[i]?.trim();
          return obj;
        }, {});
      });
      const unique: any = [];
      const duplicates: any = [];
      const seen = new Set();
      leads.forEach((lead) => {
        const email = (lead.Email || "").toLowerCase();
        const phone = (lead.Phone || "").replace(/\\D/g, "");
        const key = email || phone;
        if (seen.has(key)) {
          duplicates.push(lead);
        } else {
          seen.add(key);
          unique.push(lead);
        }
      });
      return {
        summary: {
          totalRecords: leads.length,
          uniqueRecords: unique.length,
          duplicateRecords: duplicates.length,
        },
        unique,
        duplicates,
      };
    },
    useCases: [
      {
        title: "CRM Import Cleanup",
        input: [
          "Name,Email,Phone",
          "John Doe,john@gmail.com,9876543210",
          "John Doe,john@gmail.com,9876543210",
        ],
        output: {
          totalRecords: 2,
          uniqueRecords: 1,
          duplicateRecords: 1,
        },
      },
      {
        title: "Marketing Email List Cleanup",
        input: [
          "Name,Email,Phone",
          "Alice,alice@gmail.com,1111111111",
          "Alice Smith,Alice@gmail.com,1111111111",
        ],
        output: {
          uniqueRecords: 1,
          duplicateRecords: 1,
        },
      },
      {
        title: "Multi-Source Lead Consolidation",
        input: [
          "Name,Email,Phone",
          "Rahul,rahul@test.com,9999999999",
          "Rahul Kumar,rahul@test.com,8888888888",
          "Rahul,other@test.com,9999999999",
        ],
        output: {
          uniqueRecords: 1,
          duplicateRecords: 2,
        },
      },
    ],
    functionArgs: [
      "function leadDeduplicator(csv){const rows=csv.trim().split('\\n');const headers=rows[0].split('",
      "');const leads=rows.slice(1).map(row",
    ],
    functionBody:
      "const values=row.split(',');return headers.reduce((obj,h,i)=>{obj[h.trim()]=values[i]?.trim();return obj;},{});});const unique=[];const duplicates=[];const seen=new Set();leads.forEach(lead=>{const email=(lead.Email||'').toLowerCase();const phone=(lead.Phone||'').replace(/\\D/g,'');const key=email||phone;if(seen.has(key)){duplicates.push(lead);}else{seen.add(key);unique.push(lead);}});return {summary:{totalRecords:leads.length,uniqueRecords:unique.length,duplicateRecords:duplicates.length},unique,duplicates};",
  },

  {
    id: "fn_schema_to_dto",

    tags: [
      "developer",
      "nestjs",
      "mongoose",
      "dto",
      "swagger",
      "class-validator",
      "code-generator",
    ],

    name: "Schema To DTO",

    details:
      "Generate a NestJS CreateDto class from a Mongoose schema. The function reads @Prop decorators, determines field types, required fields, and automatically generates Swagger and class-validator decorators.",

    whyUse:
      "Creating DTOs manually is repetitive and error-prone. Every time a schema changes, developers must update validators, Swagger decorators, and TypeScript types. This function automates DTO generation and ensures consistency between schemas and DTOs.",

    saveTime: "15-60 minutes per DTO",

    functionArgs: [],
    functionBody: "",
    outputType: ["typescript"],
    useCases: [
      {
        title: "Generate User DTO",

        input: {
          schemaCode: `
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;
}
`,
        },

        output: `
export class CreateUserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email?: string;
}
`,
      },

      {
        title: "Generate Product DTO",

        input: {
          schemaCode: `
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop()
  price: number;
}
`,
        },

        output: "CreateProductDto",
      },

      {
        title: "Generate Order DTO",

        input: {
          schemaCode: `
export class Order {
  @Prop({ required: true })
  orderNumber: string;

  @Prop()
  isPaid: boolean;
}
`,
        },

        output: "CreateOrderDto",
      },
    ],

    code: (schemaCode: string) => {
      const classMatch = schemaCode.match(/export\s+class\s+(\w+)/);

      if (!classMatch) {
        throw new Error("Schema class not found");
      }

      const className = classMatch[1];

      const propertyRegex =
        /@Prop\s*\(\s*([\s\S]*?)\s*\)\s*([\w]+)\s*:\s*([^;]+);/g;

      const validators = new Set();
      let dtoFields = "";
      let match;

      while ((match = propertyRegex.exec(schemaCode)) !== null) {
        const propOptions = match[1] || "";
        const fieldName = match[2];
        const fieldType = match[3].trim();

        const required = propOptions.includes("required: true");

        let dtoType = "any";
        let fieldValidators = [];

        if (
          fieldType === "string" ||
          fieldType === "String" ||
          fieldType.includes("ObjectId")
        ) {
          dtoType = "string";
          fieldValidators.push("@IsString()");
          validators.add("IsString");
        } else if (fieldType === "number" || fieldType === "Number") {
          dtoType = "number";
          fieldValidators.push("@IsNumber()");
          validators.add("IsNumber");
        } else if (fieldType === "boolean" || fieldType === "Boolean") {
          dtoType = "boolean";
          fieldValidators.push("@IsBoolean()");
          validators.add("IsBoolean");
        }

        if (!required) {
          fieldValidators.unshift("@IsOptional()");
          validators.add("IsOptional");
        }

        dtoFields += `
  @ApiPropertyOptional({
    example: "${fieldName}"
  })
  ${fieldValidators.join("\n  ")}
  ${fieldName}${required ? "" : "?"}: ${dtoType};
`;
      }

      return `import { ApiPropertyOptional } from "@nestjs/swagger";
import { ${Array.from(validators).join(", ")} } from "class-validator";

export class Create${className}Dto {
${dtoFields}
}`;
    },
  },
];

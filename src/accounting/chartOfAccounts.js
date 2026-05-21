export const defaultLedgers = [

  /* ======================================
  ASSETS
  ====================================== */

  {
    name: "Cash",
    group: "Cash-in-Hand",
    category: "Assets",
    balanceType: "Dr"
  },

  {
    name: "Bank Accounts",
    group: "Bank Accounts",
    category: "Assets",
    balanceType: "Dr"
  },

  {
    name: "Accounts Receivable",
    group: "Sundry Debtors",
    category: "Assets",
    balanceType: "Dr"
  },

  {
    name: "Inventory",
    group: "Stock-in-Hand",
    category: "Assets",
    balanceType: "Dr"
  },

  {
    name: "Input CGST",
    group: "Duties & Taxes",
    category: "Assets",
    balanceType: "Dr"
  },

  {
    name: "Input SGST",
    group: "Duties & Taxes",
    category: "Assets",
    balanceType: "Dr"
  },

  {
    name: "Input IGST",
    group: "Duties & Taxes",
    category: "Assets",
    balanceType: "Dr"
  },

  /* ======================================
  LIABILITIES
  ====================================== */

  {
    name: "Accounts Payable",
    group: "Sundry Creditors",
    category: "Liabilities",
    balanceType: "Cr"
  },

  {
    name: "Output CGST",
    group: "Duties & Taxes",
    category: "Liabilities",
    balanceType: "Cr"
  },

  {
    name: "Output SGST",
    group: "Duties & Taxes",
    category: "Liabilities",
    balanceType: "Cr"
  },

  {
    name: "Output IGST",
    group: "Duties & Taxes",
    category: "Liabilities",
    balanceType: "Cr"
  },

  /* ======================================
  INCOME
  ====================================== */

  {
    name: "Sales",
    group: "Sales Accounts",
    category: "Income",
    balanceType: "Cr"
  },

  {
    name: "Sales Return",
    group: "Sales Accounts",
    category: "Income",
    balanceType: "Dr"
  },

  {
    name: "Indirect Income",
    group: "Indirect Income",
    category: "Income",
    balanceType: "Cr"
  },

  /* ======================================
  EXPENSES
  ====================================== */

  {
    name: "Purchase",
    group: "Purchase Accounts",
    category: "Expenses",
    balanceType: "Dr"
  },

  {
    name: "Purchase Return",
    group: "Purchase Accounts",
    category: "Expenses",
    balanceType: "Cr"
  },

  {
    name: "Salary Expense",
    group: "Indirect Expenses",
    category: "Expenses",
    balanceType: "Dr"
  },

  {
    name: "Rent Expense",
    group: "Indirect Expenses",
    category: "Expenses",
    balanceType: "Dr"
  },

  {
    name: "Electricity Expense",
    group: "Indirect Expenses",
    category: "Expenses",
    balanceType: "Dr"
  },

  {
    name: "Internet Expense",
    group: "Indirect Expenses",
    category: "Expenses",
    balanceType: "Dr"
  }
]
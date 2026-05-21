import { useState } from "react"

import Sidebar from "./components/Sidebar"
import CompanySetupModal from "./components/CompanySetupModal"

import Dashboard from "./pages/Dashboard"
import Invoices from "./pages/Invoices"
import Purchases from "./pages/Purchases"
import Parties from "./pages/Parties"
import Vouchers from "./pages/Vouchers"
import Reports from "./pages/Reports"
import Ledgers from "./pages/Ledgers"
import Settings from "./pages/Settings"
import Stock from "./pages/Stock"
import StockLedger from "./pages/StockLedger"

export default function App() {

  /* ACTIVE PAGE */

  const [
    activePage,
    setActivePage
  ] = useState("dashboard")

  /* SELECTED STOCK ITEM */

  const [
    selectedStockItem,
    setSelectedStockItem
  ] = useState(null)

  /* COMPANY SETUP MODAL */

  const [

    showCompanySetup,

    setShowCompanySetup

  ] = useState(

    !localStorage.getItem(
      "billmitra-company"
    )
  )

  /* DARK MODE */

  const [

    darkMode,

    setDarkMode

  ] = useState(

    localStorage.getItem(
      "billmitra-theme"
    ) === "dark"
  )

  /* THEME TOGGLE */

  function toggleTheme() {

    const newTheme =

      !darkMode

    setDarkMode(
      newTheme
    )

    localStorage.setItem(

      "billmitra-theme",

      newTheme

        ? "dark"

        : "light"
    )
  }

  /* PAGE RENDERER */

  function renderPage() {

    switch (activePage) {

      /* DASHBOARD */

      case "dashboard":

        return <Dashboard />

      /* SALES */

      case "invoices":

        return <Invoices />

      /* PURCHASES */

      case "purchases":

        return <Purchases />

      /* PARTIES */

      case "parties":

        return <Parties />

      /* VOUCHERS */

      case "vouchers":

        return <Vouchers />

      /* REPORTS */

      case "reports":

        return <Reports />

      /* LEDGERS */

      case "ledgers":

        return <Ledgers />

      /* STOCK */

      case "stock":

        return (

          <Stock

            openLedger={(item) => {

              setSelectedStockItem(
                item
              )

              setActivePage(
                "stock-ledger"
              )
            }}

          />

        )

      /* STOCK LEDGER */

      case "stock-ledger":

        return (

          <StockLedger

            itemName={
              selectedStockItem
            }

            goBack={() =>
              setActivePage("stock")
            }

          />

        )

      /* SETTINGS */

      case "settings":

        return <Settings />

      /* DEFAULT */

      default:

        return <Dashboard />
    }
  }

  return (

    <div
      style={{

        display: "flex",

        minHeight: "100vh",

        background:

          darkMode

            ? "#0f172a"

            : "#eef2f7",

        transition:
          "0.3s"
      }}
    >

      {/* COMPANY SETUP POPUP */}

      {

        showCompanySetup && (

          <CompanySetupModal

            onClose={() =>

              setShowCompanySetup(
                false
              )

            }

          />

        )
      }

      {/* SIDEBAR */}

      <Sidebar

        activePage={
          activePage
        }

        setActivePage={
          setActivePage
        }

      />

      {/* MAIN CONTENT */}

      <div
        style={{

          flex: 1,

          padding: "35px",

          overflowY: "auto"
        }}
      >

        {/* TOP BAR */}

        <div
          style={{

            display: "flex",

            justifyContent:
              "flex-end",

            marginBottom: "20px"
          }}
        >

          <button

            onClick={
              toggleTheme
            }

            style={{

              background:

                darkMode

                  ? "#1e293b"

                  : "#2563eb",

              color: "white",

              border: "none",

              padding:
                "12px 18px",

              borderRadius:
                "14px",

              cursor: "pointer",

              fontWeight:
                "700",

              fontSize:
                "14px",

              boxShadow:
                "0 4px 14px rgba(0,0,0,0.15)"
            }}
          >

            {

              darkMode

                ? "☀ Light Mode"

                : "🌙 Dark Mode"
            }

          </button>

        </div>

        {/* PAGE CONTAINER */}

        <div
          style={{

            background:

              darkMode

                ? "#111827"

                : "linear-gradient(to bottom right, #ffffff, #f8fafc)",

            color:

              darkMode

                ? "#f8fafc"

                : "#0f172a",

            borderRadius:
              "28px",

            padding: "35px",

            minHeight:
              "calc(100vh - 120px)",

            boxShadow:
              "0 12px 40px rgba(0,0,0,0.08)",

            border:

              darkMode

                ? "1px solid #1e293b"

                : "1px solid #e2e8f0",

            transition:
              "0.3s"
          }}
        >

          {renderPage()}

        </div>

      </div>

    </div>
  )
}
import {

  useEffect,
  useState

}
from "react"

import {
  getStock
}
from "../service/stockService"

export default function Stock({
  openLedger
}) {

  const [stockData, setStockData] =
    useState({})

  useEffect(() => {

    async function loadStock() {

      const data =
        await getStock(
          "demo-company"
        )

      setStockData(data || {})
    }

    loadStock()

  }, [])

  function calculateSummary(entries) {

    let inward = 0
    let outward = 0

    Object.values(entries).forEach(

      (entry) => {

        if (
          entry.type === "IN"
        ) {

          inward +=
            Number(entry.quantity)
        }

        else {

          outward +=
            Number(entry.quantity)
        }
      }
    )

    return {

      inward,

      outward,

      closing:
        inward - outward
    }
  }

  return (

    <div>

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "35px"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "40px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "10px"
            }}
          >

            Inventory Dashboard

          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "16px"
            }}
          >

            Real-time stock monitoring and inventory analytics

          </p>

        </div>

        <div
          style={summaryCard}
        >

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px"
            }}
          >

            Total Items

          </p>

          <h2
            style={{
              margin: 0,
              color: "#2563eb"
            }}
          >

            {
              Object.keys(stockData)
                .length
            }

          </h2>

        </div>

      </div>

      {/* TABLE */}

      <div
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "25px",
          boxShadow:
            "0 10px 35px rgba(0,0,0,0.08)"
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background:
                  "#f8fafc"
              }}
            >

              <th style={tableHeader}>
                Item
              </th>

              <th style={tableHeader}>
                Inward
              </th>

              <th style={tableHeader}>
                Outward
              </th>

              <th style={tableHeader}>
                Closing
              </th>

              <th style={tableHeader}>
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {

              Object.entries(stockData)
                .map(

                  ([itemName, entries]) => {

                    const summary =

                      calculateSummary(
                        entries
                      )

                    return (

                      <tr
                        key={itemName}
                        style={{
                          borderBottom:
                            "1px solid #e2e8f0",
                          transition:
                            "0.2s"
                        }}
                      >

                        {/* CLICKABLE ITEM */}

                        <td
                          style={tableCell}
                        >

                          <button

                            onClick={() =>
                              openLedger(
                                itemName
                              )
                            }

                            style={{

                              background:
                                "none",

                              border: "none",

                              color:
                                "#2563eb",

                              fontWeight:
                                "700",

                              cursor:
                                "pointer",

                              fontSize:
                                "15px"
                            }}
                          >

                            {itemName}

                          </button>

                        </td>

                        {/* INWARD */}

                        <td
                          style={{
                            ...tableCell,
                            color:
                              "#16a34a",
                            fontWeight:
                              "700"
                          }}
                        >

                          {summary.inward}

                        </td>

                        {/* OUTWARD */}

                        <td
                          style={{
                            ...tableCell,
                            color:
                              "#dc2626",
                            fontWeight:
                              "700"
                          }}
                        >

                          {summary.outward}

                        </td>

                        {/* CLOSING */}

                        <td
                          style={{
                            ...tableCell,
                            color:
                              "#2563eb",
                            fontWeight:
                              "700"
                          }}
                        >

                          {summary.closing}

                        </td>

                        {/* STATUS */}

                        <td
                          style={tableCell}
                        >

                          <span
                            style={{

                              background:

                                summary.closing > 0

                                  ? "#dcfce7"

                                  : "#fee2e2",

                              color:

                                summary.closing > 0

                                  ? "#166534"

                                  : "#991b1b",

                              padding:
                                "8px 14px",

                              borderRadius:
                                "999px",

                              fontSize:
                                "13px",

                              fontWeight:
                                "700"
                            }}
                          >

                            {

                              summary.closing > 0

                                ? "In Stock"

                                : "Out of Stock"
                            }

                          </span>

                        </td>

                      </tr>
                    )
                  }
                )
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

/* STYLES */

const tableHeader = {

  textAlign: "left",

  padding: "18px",

  color: "#334155",

  fontSize: "15px",

  fontWeight: "700"
}

const tableCell = {

  padding: "18px",

  fontSize: "15px",

  color: "#0f172a"
}

const summaryCard = {

  background: "white",

  padding: "18px 24px",

  borderRadius: "20px",

  boxShadow:
    "0 4px 20px rgba(0,0,0,0.08)"
}
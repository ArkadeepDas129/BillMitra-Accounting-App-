import {
  useEffect,
  useState
}
from "react"

import {
  getDatabase,
  ref,
  onValue
}
from "firebase/database"

export default function StockLedger({

  itemName,

  goBack

}) {

  const [entries, setEntries] =
    useState([])

  useEffect(() => {

    const db =
      getDatabase()

    const stockRef =
      ref(

        db,

        `companies/demo-company/stock/${itemName}`
      )

    onValue(

      stockRef,

      (snapshot) => {

        const data =
          snapshot.val()

        if (!data) {

          setEntries([])
          return
        }

        const loadedEntries =

          Object.values(data)

        setEntries(
          loadedEntries
        )
      }
    )

  }, [itemName])

  return (

    <div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "36px",
              marginBottom: "10px"
            }}
          >

            {itemName}

          </h1>

          <p
            style={{
              color: "#64748b"
            }}
          >

            Complete stock movement ledger

          </p>

        </div>

        <button

          onClick={goBack}

          style={{

            background: "#2563eb",

            color: "white",

            border: "none",

            padding:
              "12px 18px",

            borderRadius:
              "12px",

            cursor: "pointer"
          }}
        >

          ← Back

        </button>

      </div>

      <div
        style={{

          background: "white",

          borderRadius: "20px",

          padding: "20px",

          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)"
        }}
      >

        <table
          width="100%"
          cellPadding="14"
        >

          <thead>

            <tr
              style={{
                background:
                  "#f8fafc"
              }}
            >

              <th align="left">
                Date
              </th>

              <th align="left">
                Party
              </th>

              <th align="left">
                Voucher
              </th>

              <th align="left">
                Type
              </th>

              <th align="right">
                Qty
              </th>

              <th align="right">
                Rate
              </th>

              <th align="right">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {

              entries.map(

                (
                  entry,
                  index
                ) => (

                  <tr
                    key={index}
                    style={{
                      borderBottom:
                        "1px solid #e2e8f0"
                    }}
                  >

                    <td>

                      {

                        new Date(
                          entry.date
                        )
                        .toLocaleDateString()

                      }

                    </td>

                    <td>

  {

    entry.partyName

    ||

    "Walk-in Party"

  }

</td>

                    <td>
                      {
                        entry.invoiceNumber
                      }
                    </td>

                    <td>

                      <span
                        style={{

                          background:

                            entry.type === "IN"

                              ? "#dcfce7"

                              : "#fee2e2",

                          color:

                            entry.type === "IN"

                              ? "#166534"

                              : "#991b1b",

                          padding:
                            "6px 12px",

                          borderRadius:
                            "999px",

                          fontWeight:
                            "600"
                        }}
                      >

                        {entry.type}

                      </span>

                    </td>

                    <td align="right">
                      {entry.quantity}
                    </td>

                    <td align="right">
                      ₹{entry.rate}
                    </td>

                    <td align="right">
                      ₹{entry.amount}
                    </td>

                  </tr>
                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}
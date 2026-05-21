import {
  useEffect,
  useState
}
from "react"

import {
  ref,
  get
}
from "firebase/database"

import {
  db
}
from "../firebase"

export default function Ledgers() {

  const [ledgers, setLedgers] =
    useState({})
    const [search, setSearch] =
  useState("")

  useEffect(() => {

    async function fetchLedgers() {

      const ledgerRef = ref(

        db,

        "companies/demo-company/ledgers"
      )

      const snapshot =
        await get(ledgerRef)

      if (snapshot.exists()) {

        setLedgers(
          snapshot.val()
        )
      }
    }

    fetchLedgers()

  }, [])

  return (

    <div className="page-container">

      <h1 className="page-title">
        Ledgers
      </h1>
      <div className="ledger-search">

  <input

    type="text"

    placeholder="Search ledger..."

    value={search}

    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }

    className="ledger-search-input"
  />

</div>

      {

       Object.keys(ledgers)

.filter((ledgerName) =>

  ledgerName
    .toLowerCase()

    .includes(

      search.toLowerCase()
    )
)

.map((ledgerName) => {

          const entries =
            Object.values(
              ledgers[ledgerName]
            )

          let balance = 0

          return (

            <div
              className="ledger-card"
              key={ledgerName}
            >

              <div className="ledger-header">

                <h2>
                  {ledgerName}
                </h2>

              </div>

              <table
                className="ledger-table"
              >

                <thead>

                  <tr>

                    <th>Date</th>

                    <th>Voucher</th>

                    <th>Invoice</th>

                    <th>Type</th>

                    <th>Amount</th>

                    <th>Balance</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    entries.map(

                      (
                        entry,
                        index
                      ) => {

                        if (
                          entry.type === "Dr"
                        ) {

                          balance +=
                            Number(
                              entry.amount
                            )

                        } else {

                          balance -=
                            Number(
                              entry.amount
                            )
                        }

                        return (

                          <tr
                            key={index}
                          >

                            <td>

                              {
                                entry.date
                                ?.slice(0,10)
                              }

                            </td>

                            <td>

                              {
                                entry.voucherType
                              }

                            </td>

                            <td>

                              {
                                entry.invoiceNumber
                              }

                            </td>

                            <td>

                              {
                                entry.type
                              }

                            </td>

                            <td>

                              ₹
                              {
                                Number(
                                  entry.amount
                                )
                                .toFixed(2)
                              }

                            </td>

                            <td>

                              ₹
                              {
                                balance
                                .toFixed(2)
                              }

                            </td>

                          </tr>
                        )
                      }
                    )
                  }

                </tbody>

              </table>

            </div>
          )
        })
      }

    </div>
  )
}
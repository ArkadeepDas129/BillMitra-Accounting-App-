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

export default function Vouchers() {

  const [vouchers, setVouchers] =
    useState([])

  const [search, setSearch] =
    useState("")

  useEffect(() => {

    async function fetchVouchers() {

      const voucherRef = ref(

        db,

        "companies/demo-company/vouchers"
      )

      const snapshot =
        await get(voucherRef)

      if (snapshot.exists()) {

        setVouchers(

          Object.values(
            snapshot.val()
          )
        )
      }
    }

    fetchVouchers()

  }, [])

  const filteredVouchers =
    vouchers.filter(

      (voucher) =>

        voucher.invoiceNumber
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          )

        ||

        voucher.voucherType
          ?.toLowerCase()

          .includes(
            search.toLowerCase()
          )
    )

  return (

    <div className="page-container">

      <h1 className="page-title">
        Vouchers
      </h1>

      {/* SEARCH */}

      <div className="voucher-search">

        <input

          type="text"

          placeholder="Search vouchers..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="voucher-search-input"
        />

      </div>

      {/* VOUCHERS */}

      {

        filteredVouchers.map(

          (
            voucher,
            index
          ) => (

            <div
              className="voucher-card"
              key={index}
            >

              <div className="voucher-header">

                <div>

                  <h2>
                    {
                      voucher.voucherType
                    }
                  </h2>

                  <p>
                    Invoice:
                    {
                      voucher.invoiceNumber
                    }
                  </p>

                </div>

                <div className="voucher-total">

                  ₹
                  {
                    Number(
                      voucher.total
                    )
                    .toFixed(2)
                  }

                </div>

              </div>

              <div className="voucher-date">

                {
                  voucher.date
                  ?.slice(0,10)
                }

              </div>

              <table
                className="voucher-table"
              >

                <thead>

                  <tr>

                    <th>
                      Ledger
                    </th>

                    <th>
                      Type
                    </th>

                    <th>
                      Amount
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    voucher.entries.map(

                      (
                        entry,
                        i
                      ) => (

                        <tr key={i}>

                          <td>
                            {
                              entry.ledger
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

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>
          )
        )
      }

    </div>
  )
}
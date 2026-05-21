export default function InvoicePreview({
  invoiceData,
  items
}) {

  const companyData =

    JSON.parse(

      localStorage.getItem(
        "billmitra-company"
      )

    ) || {}

  return (

    <div
      style={{

        background: "#ffffff",

        borderRadius: "20px",

        overflow: "hidden",

        border:
          "1px solid #cbd5e1",

        color: "#0f172a"
      }}
    >

      {/* HEADER */}

      <div
        style={{

          padding: "30px",

          textAlign: "center",

          borderBottom:
            "1px solid #cbd5e1"
        }}
      >

        <h1
          style={{

            margin: 0,

            fontSize: "36px",

            fontWeight: "800"
          }}
        >

          TAX INVOICE

        </h1>

        <p
          style={{

            color: "#64748b",

            marginTop: "10px"
          }}
        >

          GST Compliant Invoice

        </p>

      </div>

      {/* COMPANY DETAILS */}

      <div
        style={{

          display: "grid",

          gridTemplateColumns:
            "1.3fr 0.7fr",

          borderBottom:
            "1px solid #cbd5e1"
        }}
      >

        {/* LEFT */}

        <div
          style={{

            padding: "25px",

            borderRight:
              "1px solid #cbd5e1"
          }}
        >

          <h2
            style={{

              marginTop: 0,

              marginBottom: "12px"
            }}
          >

            {

              companyData.companyName

              ||

              "Your Company"
            }

          </h2>

          <div style={textStyle}>

            GSTIN:
            {" "}

            {

              companyData.gstin

              ||

              "-"
            }

          </div>

          <div style={textStyle}>

            {

              companyData.address

              ||

              "-"
            }

          </div>

          <div style={textStyle}>

            {

              companyData.state

              ||

              "-"
            }

          </div>

          <div style={textStyle}>

            Phone:
            {" "}

            {

              companyData.phone

              ||

              "-"
            }

          </div>

          <div style={textStyle}>

            Email:
            {" "}

            {

              companyData.email

              ||

              "-"
            }

          </div>

        </div>

        {/* RIGHT */}

        <div
          style={{
            padding: "25px"
          }}
        >

          <MetaRow
            label="Invoice No"
            value={
              invoiceData.invoiceNo
            }
          />

          <MetaRow
            label="Date"
            value={
              invoiceData.invoiceDate
            }
          />

          <MetaRow
            label="Payment"
            value="Credit"
          />

        </div>

      </div>

      {/* PARTY DETAILS */}

      <div
        style={{

          padding: "25px",

          borderBottom:
            "1px solid #cbd5e1"
        }}
      >

        <div
          style={{

            fontWeight: "700",

            marginBottom: "18px",

            color: "#334155"
          }}
        >

          Buyer / Supplier Details

        </div>

        <div
          style={{

            fontSize: "24px",

            fontWeight: "800",

            marginBottom: "18px"
          }}
        >

          {

            invoiceData.buyerName

            ||

            "-"
          }

        </div>

        <div
          style={{

            display: "grid",

            gridTemplateColumns:
              "1fr 1fr",

            gap: "14px"
          }}
        >

          <PartyBox
            label="GSTIN"
            value={
              invoiceData.buyerGSTIN
            }
          />

          <PartyBox
            label="Phone"
            value={
              invoiceData.buyerPhone
            }
          />

          <PartyBox
            label="Address"
            value={
              invoiceData.buyerAddress
            }
          />

          <PartyBox
            label="State"
            value={
              invoiceData.buyerState
            }
          />

          <PartyBox
            label="Email"
            value={
              invoiceData.buyerEmail
            }
          />

        </div>

      </div>

      {/* ITEMS */}

      <div
        style={{
          padding: "25px"
        }}
      >

        <table
          style={{

            width: "100%",

            borderCollapse:
              "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background:
                  "#f8fafc"
              }}
            >

              <TableHead>
                Item
              </TableHead>

              <TableHead>
                Qty
              </TableHead>

              <TableHead>
                Rate
              </TableHead>

              <TableHead>
                GST %
              </TableHead>

            </tr>

          </thead>

          <tbody>

            {

              items.map(

                (item, index) => (

                  <tr
                    key={index}
                  >

                    <TableCell>

                      {

                        item.description

                      }

                    </TableCell>

                    <TableCell>

                      {

                        item.quantity

                      }

                    </TableCell>

                    <TableCell>

                      ₹{

                        item.rate

                      }

                    </TableCell>

                    <TableCell>

                      {

                        item.gstRate

                      }%

                    </TableCell>

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

/* META ROW */

function MetaRow({
  label,
  value
}) {

  return (

    <div
      style={{

        display: "flex",

        justifyContent:
          "space-between",

        marginBottom: "14px"
      }}
    >

      <span
        style={{
          color: "#64748b"
        }}
      >

        {label}

      </span>

      <strong>

        {value}

      </strong>

    </div>
  )
}

/* PARTY BOX */

function PartyBox({
  label,
  value
}) {

  return (

    <div
      style={{

        background: "#f8fafc",

        border:
          "1px solid #e2e8f0",

        borderRadius: "12px",

        padding: "14px"
      }}
    >

      <div
        style={{

          fontSize: "12px",

          color: "#64748b",

          marginBottom: "6px",

          fontWeight: "700"
        }}
      >

        {label}

      </div>

      <div
        style={{

          color: "#0f172a",

          fontWeight: "500"
        }}
      >

        {

          value

          ||

          "-"
        }

      </div>

    </div>
  )
}

/* TABLE HEAD */

function TableHead({
  children
}) {

  return (

    <th
      style={{

        textAlign: "left",

        padding: "14px",

        borderBottom:
          "1px solid #cbd5e1"
      }}
    >

      {children}

    </th>
  )
}

/* TABLE CELL */

function TableCell({
  children
}) {

  return (

    <td
      style={{

        padding: "14px",

        borderBottom:
          "1px solid #e2e8f0"
      }}
    >

      {children}

    </td>
  )
}

const textStyle = {

  marginBottom: "8px",

  color: "#475569",

  fontSize: "14px"
}
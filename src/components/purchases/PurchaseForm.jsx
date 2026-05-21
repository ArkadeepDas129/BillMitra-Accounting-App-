import { useState } from "react"

export default function PurchaseForm() {

  const [supplierName, setSupplierName] =
    useState("")

  const [supplierGSTIN, setSupplierGSTIN] =
    useState("")

  const [itemName, setItemName] =
    useState("")

  const [quantity, setQuantity] =
    useState("")

  const [rate, setRate] =
    useState("")

  const amount =

    Number(quantity || 0) *

    Number(rate || 0)

  function savePurchase() {

    alert(
      "Purchase Saved"
    )
  }

  return (

    <div>

      {/* HEADER */}

      <div
        style={{
          marginBottom: "30px"
        }}
      >

        <h1
          style={{
            fontSize: "38px",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "10px"
          }}
        >

          Purchase Voucher

        </h1>

        <p
          style={{
            color: "#64748b"
          }}
        >

          Record supplier purchases and inward stock

        </p>

      </div>

      {/* FORM */}

      <div
        style={{

          background: "white",

          borderRadius: "24px",

          padding: "30px",

          boxShadow:
            "0 10px 40px rgba(0,0,0,0.08)"
        }}
      >

        {/* SUPPLIER */}

        <h2
          style={{
            marginBottom: "20px"
          }}
        >

          Supplier Details

        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "20px",
            marginBottom: "30px"
          }}
        >

          <input

            placeholder="Supplier Name"

            value={supplierName}

            onChange={(e) =>
              setSupplierName(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <input

            placeholder="Supplier GSTIN"

            value={supplierGSTIN}

            onChange={(e) =>
              setSupplierGSTIN(
                e.target.value
              )
            }

            style={inputStyle}
          />

        </div>

        {/* ITEM */}

        <h2
          style={{
            marginBottom: "20px"
          }}
        >

          Item Details

        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr",
            gap: "20px",
            marginBottom: "20px"
          }}
        >

          <input

            placeholder="Item Name"

            value={itemName}

            onChange={(e) =>
              setItemName(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <input

            placeholder="Quantity"

            value={quantity}

            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <input

            placeholder="Rate"

            value={rate}

            onChange={(e) =>
              setRate(
                e.target.value
              )
            }

            style={inputStyle}
          />

        </div>

        {/* AMOUNT */}

        <div
          style={{
            marginTop: "20px",
            marginBottom: "30px"
          }}
        >

          <h2>

            Amount:
            ₹{amount}

          </h2>

        </div>

        {/* BUTTON */}

        <button

          onClick={savePurchase}

          style={{

            background: "#2563eb",

            color: "white",

            border: "none",

            padding:
              "14px 24px",

            borderRadius:
              "14px",

            fontWeight:
              "700",

            cursor: "pointer",

            fontSize: "15px"
          }}
        >

          Save Purchase

        </button>

      </div>

    </div>
  )
}

const inputStyle = {

  padding: "14px",

  border:
    "1px solid #cbd5e1",

  borderRadius: "14px",

  fontSize: "15px",

  outline: "none"
}
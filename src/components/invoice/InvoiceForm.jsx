import {
  useState,
  useEffect
}
from "react"

import InvoicePreview
from "./InvoicePreview"

import {
  createSalesVoucher
}
from "../../accounting/postingEngine"

import {
  createPurchaseVoucher
}
from "../../accounting/purchasePostingEngine"

import {
  saveLedgerEntry
}
from "../../service/ledgerService"

import {
  getParties
}
from "../../service/partyService"

import {
  saveVoucher
}
from "../../service/voucherService"

import {
  saveStockEntry
}
from "../../service/stockService"

export default function InvoiceForm({
  type = "sales"
}) {

  const [invoiceData, setInvoiceData] =
    useState({

      supplierName:
        "Surabhi Hardwares, Bangalore",

      supplierGSTIN:
        "29AACCT3705E000",

      buyerName: "",

      buyerGSTIN: "",

      invoiceNo:
        "SHB/456/20",

      invoiceDate:
        "2025-05-16"
    })

  const [items, setItems] =
    useState([

      {
        description: "",

        hsn: "",

        quantity: 1,

        unit: "No",

        rate: 0,

        discount: 0,

        gstRate: 18
      }
    ])

  const [parties, setParties] =
    useState([])

  useEffect(() => {

    async function loadParties() {

      const data =
        await getParties(
          "demo-company"
        )

      setParties(data)
    }

    loadParties()

  }, [])

  function handleChange(e) {

    setInvoiceData({

      ...invoiceData,

      [e.target.name]:
        e.target.value
    })
  }

  function handleItemChange(

    index,
    field,
    value

  ) {

    const updated =
      [...items]

    updated[index][field] =
      value

    setItems(updated)
  }

  function addItem() {

    setItems([

      ...items,

      {
        description: "",
        hsn: "",
        quantity: 1,
        unit: "No",
        rate: 0,
        discount: 0,
        gstRate: 18
      }
    ])
  }

  async function saveInvoice() {

    try {

      const subtotal =
        items.reduce(

          (sum, item) => {

            const gross =

              Number(item.quantity) *

              Number(item.rate)

            const taxable =

              gross -

              Number(item.discount)

            return sum + taxable

          },

          0
        )

      const totalGST =
        items.reduce(

          (sum, item) => {

            const gross =

              Number(item.quantity) *

              Number(item.rate)

            const taxable =

              gross -

              Number(item.discount)

            const gst =

              taxable *

              (
                Number(item.gstRate) / 100
              )

            return sum + gst

          },

          0
        )

      const cgst =
        totalGST / 2

      const sgst =
        totalGST / 2

      const grandTotal =
        subtotal + totalGST

      let voucher

      if (
        type === "purchase"
      ) {

        voucher =

          createPurchaseVoucher({

            supplierName:
              invoiceData.buyerName,

            subtotal,

            cgst,

            sgst,

            grandTotal,

            invoiceNumber:
              invoiceData.invoiceNo
          })

      } else {

        voucher =

          createSalesVoucher({

            customerName:
              invoiceData.buyerName,

            subtotal,

            cgst,

            sgst,

            grandTotal,

            invoiceNumber:
              invoiceData.invoiceNo
          })
      }

      await saveVoucher(

        "demo-company",

        voucher
      )

      /* STOCK ENTRY */

for (
  const item of items
) {

  const normalizedName =

    item.description
      .trim()
      .toLowerCase()

  const displayName =

    item.description
      .trim()

  await saveStockEntry(

    "demo-company",

    normalizedName,

    {

      displayName:
        displayName,

      date:
        new Date()
        .toISOString(),

      type:
        type === "purchase"
          ? "IN"
          : "OUT",

      quantity:
        Number(item.quantity),

      invoiceNumber:
        invoiceData.invoiceNo,

      partyName:

  type === "purchase"

    ? invoiceData.supplierName

    : invoiceData.buyerName,

      voucherType:
        type === "purchase"
          ? "Purchase"
          : "Sales"
    }
  )
}

      /* STOCK ENTRY */

      for (
        const item of items
      ) {

        await saveStockEntry(

          "demo-company",

          item.description,

          {

            date:
              new Date()
              .toISOString(),

            type:
              type === "purchase"
                ? "IN"
                : "OUT",

           quantity:
  Number(item.quantity),

rate:
  Number(item.rate),

amount:

  Number(item.quantity) *

  Number(item.rate),

invoiceNumber:
  invoiceData.invoiceNo,
          }
        )
      }

      alert(
        "Invoice Posted Successfully"
      )

    } catch (error) {

      console.error(error)

      alert(
        "Error Saving Invoice"
      )
    }
  }

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "1fr 1.2fr",
        gap: "30px"
      }}
    >

      {/* LEFT PANEL */}

      <div>

        <div style={cardStyle}>

          <h1 style={titleStyle}>

            {
              type === "purchase"
                ? "Purchase Invoice"
                : "Sales Invoice"
            }

          </h1>

          <p style={subtitleStyle}>

            Professional GST billing

          </p>

        </div>

        {/* INVOICE DETAILS */}

        <div style={cardStyle}>

          <h3 style={sectionTitle}>
            Invoice Details
          </h3>

          <div style={gridStyle}>

            <input
              style={inputStyle}
              name="invoiceNo"
              placeholder="Invoice Number"
              value={invoiceData.invoiceNo}
              onChange={handleChange}
            />

            <input
              style={inputStyle}
              type="date"
              name="invoiceDate"
              value={invoiceData.invoiceDate}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* BUYER DETAILS */}

        <div style={cardStyle}>

          <h3 style={sectionTitle}>
            Party Details
          </h3>

          <div style={gridStyle}>

            <select

              style={inputStyle}

              value={invoiceData.buyerName}

              onChange={(e) => {

                const selectedParty =

                  parties.find(

                    (party) =>

                      party.name ===
                      e.target.value
                  )

                setInvoiceData({

                  ...invoiceData,

                  buyerName:
                    selectedParty?.name || "",

                  buyerGSTIN:
                    selectedParty?.gstin || ""
                })
              }}
            >

              <option value="">
                Select Party
              </option>

              {

                parties.map(

                  (
                    party,
                    index
                  ) => (

                    <option
                      key={index}
                      value={party.name}
                    >

                      {party.name}

                    </option>
                  )
                )
              }

            </select>

            <input
              style={inputStyle}
              value={invoiceData.buyerGSTIN}
              readOnly
            />

          </div>

        </div>

        {/* ITEMS */}

        <div style={cardStyle}>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >

            <h3 style={sectionTitle}>
              Items
            </h3>

            <button
              style={buttonStyle}
              onClick={addItem}
            >

              + Add Item

            </button>

          </div>

          {

            items.map((item, index) => (

              <div
                key={index}
                style={itemCard}
              >

                <input
                  style={inputStyle}
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />

                <div style={gridStyle}>

                  <input
                    style={inputStyle}
                    placeholder="HSN"
                    value={item.hsn}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "hsn",
                        e.target.value
                      )
                    }
                  />

                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                  />

                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "rate",
                        e.target.value
                      )
                    }
                  />

                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="Discount"
                    value={item.discount}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "discount",
                        e.target.value
                      )
                    }
                  />

                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="GST %"
                    value={item.gstRate}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "gstRate",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>
            ))
          }

        </div>

        <button
          style={saveButton}
          onClick={saveInvoice}
        >

          Save Invoice

        </button>

      </div>

      {/* RIGHT SIDE */}

      <InvoicePreview
        invoiceData={invoiceData}
        items={items}
      />

    </div>
  )
}

/* STYLES */

const cardStyle = {

  background: "white",
  padding: "24px",
  borderRadius: "20px",
  marginBottom: "25px",
  boxShadow:
    "0 4px 20px rgba(0,0,0,0.08)"
}

const titleStyle = {

  fontSize: "34px",
  fontWeight: "700",
  color: "#0f172a",
  marginBottom: "8px"
}

const subtitleStyle = {

  color: "#64748b",
  fontSize: "15px"
}

const sectionTitle = {

  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "18px",
  color: "#0f172a"
}

const gridStyle = {

  display: "grid",
  gridTemplateColumns:
    "1fr 1fr",
  gap: "15px"
}

const inputStyle = {

  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  width: "100%",
  outline: "none"
}

const buttonStyle = {

  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600"
}

const saveButton = {

  width: "100%",
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "18px",
  borderRadius: "16px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer"
}

const itemCard = {

  background: "#f8fafc",
  padding: "18px",
  borderRadius: "16px",
  marginBottom: "18px"
}
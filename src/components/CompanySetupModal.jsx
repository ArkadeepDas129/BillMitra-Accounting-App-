import { useState } from "react"

export default function CompanySetupModal({
  onClose
}) {

  const [

    companyData,

    setCompanyData

  ] = useState({

    companyName: "",

    gstin: "",

    address: "",

    state: "",

    phone: "",

    email: ""
  })

  function handleChange(e) {

    setCompanyData({

      ...companyData,

      [e.target.name]:
        e.target.value
    })
  }

  function saveCompany() {

    localStorage.setItem(

      "billmitra-company",

      JSON.stringify(
        companyData
      )
    )

    onClose()
  }

  return (

    <div
      style={{

        position: "fixed",

        top: 0,

        left: 0,

        width: "100%",

        height: "100%",

        background:
          "rgba(0,0,0,0.45)",

        backdropFilter:
          "blur(6px)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        zIndex: 9999
      }}
    >

      <div
        style={{

          width: "100%",

          maxWidth: "650px",

          background: "white",

          borderRadius: "28px",

          padding: "35px",

          boxShadow:
            "0 20px 60px rgba(0,0,0,0.2)"
        }}
      >

        <h1
          style={{
            fontSize: "36px",
            color: "#0f172a",
            marginBottom: "10px"
          }}
        >

          Setup Your Business

        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px"
          }}
        >

          Enter your company information for invoices and GST billing

        </p>

        <div
          style={{
            display: "grid",
            gap: "18px"
          }}
        >

          <input
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="gstin"
            placeholder="GSTIN"
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="address"
            placeholder="Business Address"
            onChange={handleChange}
            style={{
              ...inputStyle,
              minHeight: "90px"
            }}
          />

          <input
            name="state"
            placeholder="State"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={inputStyle}
          />

          <button

            onClick={saveCompany}

            style={{

              background: "#2563eb",

              color: "white",

              border: "none",

              padding: "16px",

              borderRadius: "16px",

              fontSize: "16px",

              fontWeight: "700",

              cursor: "pointer",

              marginTop: "10px"
            }}
          >

            Save Company Details

          </button>

        </div>

      </div>

    </div>
  )
}

const inputStyle = {

  padding: "15px",

  border:
    "1px solid #cbd5e1",

  borderRadius: "14px",

  fontSize: "15px",

  outline: "none"
}
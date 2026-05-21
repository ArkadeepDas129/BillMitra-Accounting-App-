import { useState } from "react"

export default function Settings() {

  const savedCompany =

    JSON.parse(

      localStorage.getItem(
        "billmitra-company"
      )

    ) || {}

  const [

    companyData,

    setCompanyData

  ] = useState(savedCompany)

  function handleChange(e) {

    setCompanyData({

      ...companyData,

      [e.target.name]:
        e.target.value
    })
  }

  function saveSettings() {

    localStorage.setItem(

      "billmitra-company",

      JSON.stringify(
        companyData
      )
    )

    alert(
      "Company Details Updated"
    )
  }

  return (

    <div>

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

          Company Settings

        </h1>

        <p
          style={{
            color: "#64748b"
          }}
        >

          Manage business information and invoice details

        </p>

      </div>

      <div
        style={{

          background: "white",

          borderRadius: "24px",

          padding: "35px",

          boxShadow:
            "0 10px 35px rgba(0,0,0,0.08)"
        }}
      >

        <div
          style={{
            display: "grid",
            gap: "20px"
          }}
        >

          <input
            name="companyName"
            placeholder="Company Name"
            value={
              companyData.companyName || ""
            }
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="gstin"
            placeholder="GSTIN"
            value={
              companyData.gstin || ""
            }
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={
              companyData.address || ""
            }
            onChange={handleChange}
            style={{
              ...inputStyle,
              minHeight: "100px"
            }}
          />

          <input
            name="state"
            placeholder="State"
            value={
              companyData.state || ""
            }
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={
              companyData.phone || ""
            }
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="email"
            placeholder="Email"
            value={
              companyData.email || ""
            }
            onChange={handleChange}
            style={inputStyle}
          />

          <button

            onClick={saveSettings}

            style={{

              background: "#2563eb",

              color: "white",

              border: "none",

              padding: "16px",

              borderRadius: "16px",

              fontWeight: "700",

              fontSize: "15px",

              cursor: "pointer"
            }}
          >

            Save Changes

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
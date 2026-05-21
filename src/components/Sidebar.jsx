export default function Sidebar({
  activePage,
  setActivePage
}) {

  const menuItems = [

  "dashboard",
  "invoices",
  "purchases",
  "parties",
  "vouchers",
  "ledgers",
  "stock",
  "reports",
  "settings"
]

  return (
    <div
      style={{
        width: "260px",
        background: "#0f172a",
        color: "white",
        padding: "20px"
      }}
    >

      <h1
        style={{
          fontSize: "30px",
          marginBottom: "40px"
        }}
      >
        ⚡ BillMitra
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        {menuItems.map((item) => (

          <button
            key={item}
            onClick={() => setActivePage(item)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background:
                activePage === item
                  ? "#2563eb"
                  : "transparent",
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "16px",
              textTransform: "capitalize"
            }}
          >
            {item}
          </button>

        ))}

      </div>

    </div>
  )
}
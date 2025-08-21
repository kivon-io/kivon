interface WaitlistAdminEmailProps {
  email: string
  timestamp?: string
  userAgent?: string
  ip?: string
}

export function WaitlistAdminEmail({
  email,
  timestamp = new Date().toLocaleString(),
  userAgent,
  ip,
}: WaitlistAdminEmailProps) {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        color: "#333333",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "2px solid #f0f0f0",
          paddingBottom: "20px",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            fontSize: "24px",
            margin: "0",
            fontWeight: "600",
          }}
        >
          🎉 New Waitlist Signup
        </h1>
        <p
          style={{
            color: "#666666",
            fontSize: "14px",
            margin: "5px 0 0 0",
          }}
        >
          Kivon Admin Notification
        </p>
      </div>

      {/* Main Content */}
      <div style={{ marginBottom: "30px" }}>
        <h2
          style={{
            color: "#1f2937",
            fontSize: "18px",
            marginBottom: "15px",
            fontWeight: "500",
          }}
        >
          Signup Details
        </h2>

        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#374151" }}>Email Address:</strong>
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                padding: "8px 12px",
                marginTop: "4px",
                fontSize: "16px",
                color: "#1f2937",
                fontFamily: "monospace",
              }}
            >
              {email}
            </div>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#374151" }}>Timestamp:</strong>
            <span
              style={{
                marginLeft: "8px",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              {timestamp}
            </span>
          </div>

          {ip && (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#374151" }}>IP Address:</strong>
              <span
                style={{
                  marginLeft: "8px",
                  color: "#6b7280",
                  fontSize: "14px",
                  fontFamily: "monospace",
                }}
              >
                {ip}
              </span>
            </div>
          )}

          {userAgent && (
            <div>
              <strong style={{ color: "#374151" }}>User Agent:</strong>
              <div
                style={{
                  marginTop: "4px",
                  color: "#6b7280",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  padding: "6px 8px",
                }}
              >
                {userAgent}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Items */}
      <div
        style={{
          backgroundColor: "#fef3c7",
          border: "1px solid #fbbf24",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "30px",
        }}
      >
        <h3
          style={{
            color: "#92400e",
            fontSize: "16px",
            margin: "0 0 8px 0",
            fontWeight: "500",
          }}
        >
          📋 Next Steps
        </h3>
        <ul
          style={{
            color: "#92400e",
            fontSize: "14px",
            margin: "0",
            paddingLeft: "20px",
          }}
        >
          <li>Add email to your mailing list</li>
          <li>Send welcome/confirmation email to user</li>
          <li>Update waitlist analytics dashboard</li>
        </ul>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          paddingTop: "20px",
          textAlign: "center",
          color: "#9ca3af",
          fontSize: "12px",
        }}
      >
        <p style={{ margin: "0" }}>This is an automated notification from Kivon Waitlist System</p>
        <p style={{ margin: "5px 0 0 0" }}>
          © {new Date().getFullYear()} Kivon. All rights reserved.
        </p>
      </div>
    </div>
  )
}

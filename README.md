# Sakthi Siddha Clinic Backend

Node.js + Express + MongoDB REST API for Sakthi Siddha Maruthuvam & Vethasatthi Varma Sikichalayam.

Clinic details included:
- Dr. T. Porselvi — M.D. (Siddha), M.Sc. (Yoga)
- Phone: 94438 69373
- Address: No. 2/93, Ponniyamman Koil Street, Periya Mathur, Near Mathur Gate, Chennai - 600 068
- Timezone: Asia/Kolkata
- Mon/Thu/Sat: 10:00-13:30 and 17:00-19:30
- Tue: 10:00-13:30; Wed: 17:00-19:30; Fri/Sun: closed
- Appointment by prior request; a submitted request is not a confirmed appointment.

## Requirements
Node.js 20+ and MongoDB (local or Atlas).

## Setup
1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI`, a random `JWT_SECRET` (32+ characters), administrator details and `CORS_ORIGIN`.
4. Create the first admin: `npm run seed:admin`.
5. Start: `npm run dev`.
6. API base: `http://localhost:5000/api`.

Never commit `.env` to GitHub.

## Routes
Public:
- `GET /api/health`
- `GET /api/public/clinic`
- `GET /api/public/doctor`
- `GET /api/public/treatments`
- `POST /api/appointments`

Admin:
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/appointments` (optional `?status=Pending` or `?date=YYYY-MM-DD`)
- `PATCH /api/appointments/:id/status`

Admin routes require `Authorization: Bearer YOUR_JWT_TOKEN`.

Example POST `/api/appointments` JSON:
```json
{
  "patientName":"Example Visitor",
  "phoneNumber":"9876543210",
  "appointmentDate":"2026-11-16",
  "appointmentTime":"10:30",
  "enquiryType":"General enquiry",
  "message":""
}
```
The API acknowledges the request only. Clinic staff must contact the visitor to confirm availability.

## Connect a Base44 or React frontend
Call the API using `fetch`; set the API URL in frontend configuration. Example:
```js
const API_URL = import.meta.env.VITE_API_URL;
export async function submitAppointment(formData) {
  const response = await fetch(`${API_URL}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}
```
Set `VITE_API_URL` to your deployed API origin. Add the exact deployed frontend origin to backend `CORS_ORIGIN`. Do not put database credentials, JWT secrets or admin passwords in frontend code.

## Production checklist
- Deploy API using HTTPS and managed MongoDB with network restrictions.
- Set environment variables in the hosting provider, not in source control.
- Restrict CORS to the real frontend origin.
- Add bot protection/CAPTCHA and monitoring.
- Add appointment slot capacity/conflict checks before confirming any slot.
- Back up the database and establish a retention policy.
- Publish a privacy notice and collect only necessary personal data.
- Do not collect detailed medical histories or diagnoses through this basic enquiry form.
- Verify all clinic information and treatment descriptions with the clinic before launch.

Starter API only: no SMS/WhatsApp/email notifications, payment handling, patient records or automatic slot reservation are included.

# Add User App (React + Tailwind )

This is a responsive React application to manage a list of users. It allows adding user details such as name, date of birth, Aadhar number, mobile number, and automatically calculates the age based on the entered date of birth. It supports local storage for persistence.

---

## ✨ Features

- 📅 Automatically calculate age from date of birth using `date-fns`
- 💾 Data is stored persistently using `localStorage`
- 🧠 Input validation for mobile number , aadhar number , name and birthdate
- 📱 Fully responsive UI with Tailwind CSS


---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [date-fns](https://date-fns.org/) — for age calculation


---

## 📦 Installation

```bash
git clone https://github.com/abhi1994j/Directory_App.git
cd add-user-app
npm install
npm start

${ errors[field] ? "border-red-500 ring-red-200" : "focus:ring-blue-400"}
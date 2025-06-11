import { useEffect, useState } from "react";
import { differenceInYears, parseISO } from "date-fns";

// Helper: Calculate age from DOB
const calculateAge = (dob) => {
  try {
    const birthDate = parseISO(dob);
    return differenceInYears(new Date(), birthDate);
  } catch {
    return "";
  }
};

function AddUser() {
  const [people, setPeople] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    aadhar: "",
    mobile: "",
    age: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedPeople = localStorage.getItem("peopleList");
    if (savedPeople) {
      setPeople(JSON.parse(savedPeople));
    }
  }, []);

  // Save to localStorage whenever people change
  useEffect(() => {
    localStorage.setItem("peopleList", JSON.stringify(people));
  }, [people]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      const age = calculateAge(value);
      setForm((prev) => ({ ...prev, dob: value, age }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddPerson = () => {
    if (form.name && form.dob && form.aadhar && form.mobile) {
      setPeople([...people, form]);
      setForm({ name: "", dob: "", aadhar: "", mobile: "", age: "" });
      setShowForm(false);
    }
  };

  const handleDelete = (index) => {
    const updated = people.filter((_, i) => i !== index);
    setPeople(updated);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-10">
      <div className="border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-100 font-semibold p-4 border-b text-lg">
          Add New Person
        </div>

        {/* Responsive table wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Date of Birth</th>
                <th className="p-2 border">Aadhar Number</th>
                <th className="p-2 border">Mobile Number</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{person.name}</td>
                  <td className="border p-2">{person.dob}</td>
                  <td className="border p-2">{person.aadhar}</td>
                  <td className="border p-2">{person.mobile}</td>
                  <td className="border p-2">{person.age}</td>
                  <td className="border p-2">
                    <button
                      className="text-red-600 underline hover:text-red-800 transition"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {showForm && (
                <tr className="bg-blue-50">
                  <td className="border p-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="aadhar"
                      placeholder="Aadhar number"
                      value={form.aadhar}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Mobile number"
                      value={form.mobile}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border rounded"
                      minLength='10'
                      maxLength='10' // Enforce exactly 10 digits
                      pattern="[0-9]{10}" // Regex to ensure only digits
                      required
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      name="age"
                      value={form.age}
                      disabled
                      className="w-full px-2 py-1 border rounded bg-gray-100"
                    />
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={handleAddPerson}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action buttons */}
        <div className="text-right p-4">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddUser;

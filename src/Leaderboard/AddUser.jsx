import { useEffect, useState } from "react";
import { differenceInYears, parseISO } from "date-fns";
import { FaRegTrashAlt } from "react-icons/fa";

const calculateAge = (dob) => {
  try {
    const birthDate = parseISO(dob);
    return differenceInYears(new Date(), birthDate);
  } catch {
    return "";
  }
};

function AddUser({ people, setPeople }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    aadhar: "",
    mobile: "",
    age: "",
  });
  const [errors, setErrors] = useState({}); 

  useEffect(() => {
    localStorage.setItem("peopleList", JSON.stringify(people));
  }, [people]);

  const validateForm = () => {
    const newErrors = {};
    const aadharRegex =/^\d{12}$/;
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.aadhar) {
      newErrors.aadhar = "Aadhar number is required";
    } else if (!aadharRegex.test(form.aadhar)) {
      newErrors.aadhar = "Aadhar must be 12 digits numbers";
    }

    if (!form.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validateForm()) return;

    setPeople([...people, form]);
    setForm({ name: "", dob: "", aadhar: "", mobile: "", age: "" });
    setShowForm(false);
    setErrors({});
  };

  const handleDelete = (index) => {
    const updated = people.filter((_, i) => i !== index);
    setPeople(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white text-xl font-semibold p-5">
          Add New Person
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Date of Birth</th>
                <th className="p-3 border">Aadhar Number</th>
                <th className="p-3 border">Mobile Number</th>
                <th className="p-3 border">Age</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, index) => (
                <tr
                  key={index}
                  className="text-center even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td className="p-3 border">{person.name}</td>
                  <td className="p-3 border">{person.dob}</td>
                  <td className="p-3 border">{person.aadhar}</td>
                  <td className="p-3 border">{person.mobile}</td>
                  <td className="p-3 border">{person.age}</td>
                  <td className="p-3 border">
                    <button
                      className="text-red-600 hover:text-red-800 transition underline"
                      onClick={() => handleDelete(index)}
                    >
                     <FaRegTrashAlt/>
                    </button>
                  </td>
                </tr>
              ))}

              {showForm && (
                <tr className="bg-blue-50">
                  {["name", "dob", "aadhar", "mobile"].map((field) => (
                    <td key={field} className="p-3 border">
                      <input
                        type={field === "dob" ? "date" : "text"}
                        name={field}
                        placeholder={field}
                        value={form[field]}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2`}
                      />
                      {errors[field] && (
                        <p className="text-red-600 text-xs mt-1">{errors[field]}</p>
                      )}
                    </td>
                  ))}
                  <td className="p-3 border">
                    <input
                      type="number"
                      name="age"
                      value={form.age}
                      disabled
                      className="w-full px-3 py-2 border rounded bg-gray-100"
                    />
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={handleAddPerson}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-right p-5">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow hover:scale-105 transform transition duration-200"
            >
              + Add Person
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddUser;

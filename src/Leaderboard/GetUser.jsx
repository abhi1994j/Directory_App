import { useState } from "react";

function GetUser({ people }) {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    filterData(value);
  };

  const filterData = (value) => {
    const filtered = people.filter((person) =>
      person.aadhar.includes(value.trim())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Search by Aadhar</h2>
        <input
          type="number"
          placeholder="Enter Aadhar number"
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {filteredData.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">DOB</th>
                  <th className="p-2 border">Aadhar</th>
                  <th className="p-2 border">Mobile</th>
                  <th className="p-2 border">Age</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="bg-white even:bg-gray-50">
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.dob}</td>
                    <td className="p-2 border">{item.aadhar}</td>
                    <td className="p-2 border">{item.mobile}</td>
                    <td className="p-2 border">{item.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : query.length > 0 ? (
          <p className="mt-4 text-red-500 text-center">No results found.</p>
        ) : (
          <p className="mt-4 text-gray-500 text-center">Start typing to search.</p>
        )}
      </div>
    </div>
  );
}

export default GetUser;

import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5001/api/events";

const emptyForm = {
  eventName: "",
  eventType: "",
  resourcePerson: "",
  eventDate: "",
  venue: "",
  maxParticipants: "",
  registrationStatus: ""
};

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
      } else {
        await axios.post(API, form);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setForm({
      eventName: event.eventName,
      eventType: event.eventType,
      resourcePerson: event.resourcePerson,
      eventDate: event.eventDate ? event.eventDate.slice(0, 10) : "",
      venue: event.venue,
      maxParticipants: event.maxParticipants,
      registrationStatus: event.registrationStatus
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const inputClass = "border border-gray-300 rounded p-2";
  const btnClass = "text-white px-4 py-2 rounded";

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-300">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Event Management System</h1>
          <div className="flex gap-4 text-gray-700">
            <span>Home</span>
            <span>Dashboard</span>
            <span>Records</span>
            <span>About</span>
          </div>
        </div>
      </nav>

      <header className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold">Event Management System</h2>
        <p className="text-gray-600 mt-1">CRUD Management System</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-10">
        <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="eventName" value={form.eventName} onChange={handleChange} placeholder="Event Name" required className={inputClass} />
            <select name="eventType" value={form.eventType} onChange={handleChange} required className={inputClass}>
              <option value="">Select Event Type</option>
              <option>Workshop</option>
              <option>Hackathon</option>
              <option>Seminar</option>
              <option>Masterclass</option>
              <option>Competition</option>
            </select>
            <input name="resourcePerson" value={form.resourcePerson} onChange={handleChange} placeholder="Resource Person" required className={inputClass} />
            <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} required className={inputClass} />
            <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" required className={inputClass} />
            <input name="maxParticipants" type="number" value={form.maxParticipants} onChange={handleChange} placeholder="Max Participants" required className={inputClass} />
            <select name="registrationStatus" value={form.registrationStatus} onChange={handleChange} required className={inputClass}>
              <option value="">Select Status</option>
              <option>Open</option>
              <option>Closed</option>
            </select>
          </div>
          <div className="mt-4 flex gap-2">
            {editingId ? (
              <button type="submit" className={`${btnClass} bg-yellow-500`}>Update</button>
            ) : (
              <button type="submit" className={`${btnClass} bg-green-600`}>Add</button>
            )}
            {editingId && (
              <button type="button" onClick={handleCancel} className={`${btnClass} bg-gray-500`}>Cancel</button>
            )}
          </div>
        </form>

        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Resource Person</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Venue</th>
              <th className="border border-gray-300 p-2">Max Participants</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => (
              <tr key={event._id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 p-2">{event.eventName}</td>
                <td className="border border-gray-300 p-2">{event.eventType}</td>
                <td className="border border-gray-300 p-2">{event.resourcePerson}</td>
                <td className="border border-gray-300 p-2">{new Date(event.eventDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{event.venue}</td>
                <td className="border border-gray-300 p-2">{event.maxParticipants}</td>
                <td className="border border-gray-300 p-2">{event.registrationStatus}</td>
                <td className="border border-gray-300 p-2">
                  <button onClick={() => handleEdit(event)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(event._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;


// MultiStepForm.jsx
import React, { useState } from "react";

const steps = [
  "Personal Details",
  "Account Details",
  "Tax Details",
  "Summary",
  "Receipt",
];

export default function Form() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nationalId: "",
    firstName: "",
    lastName: "",
    street: "",
    streetOptional: "",
    postCode: "",
    city: "",
    country: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-teal-50">
      <div className="bg-white rounded-2xl shadow-lg flex overflow-hidden w-[900px]">
        {/* Sidebar */}
        <div className="w-1/3 bg-white p-6 border-r">
          <h1 className="text-xl font-semibold mb-8">Create account</h1>
          <div className="space-y-6">
            {steps.map((label, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                    step === index + 1
                      ? "bg-green-500 text-white border-green-500"
                      : step > index + 1
                      ? "bg-green-200 text-green-800 border-green-200"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm ${
                    step === index + 1
                      ? "font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="w-2/3 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium">
                    National Identity Number/D-number
                  </label>
                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    className="mt-1 w-full border rounded-lg p-2 focus:ring focus:ring-green-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={formData.street}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="streetOptional"
                    placeholder="Street Address (optional)"
                    value={formData.streetOptional}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <input
                    type="text"
                    name="postCode"
                    placeholder="Post Code"
                    value={formData.postCode}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="border rounded-lg p-2 col-span-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded-lg p-2"
                  />
                </div>
              </>
            )}

            {step > 1 && step < steps.length && (
              <div className="text-gray-500">
                <p>Form for {steps[step - 1]} will go here...</p>
              </div>
            )}

            {step === steps.length && (
              <div>
                <h2 className="text-lg font-medium mb-4">Summary</h2>
                <pre className="bg-gray-100 p-4 rounded-lg">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Back
                </button>
              )}
              {step < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

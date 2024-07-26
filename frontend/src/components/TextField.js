export default function TextField({ label, placeholder, name, type, handleChange, value, children }) {
    return <div>
    <label className="text-gray-800 text-[15px] mb-2 block">{label}</label>
    <div className="relative flex items-center">
      <input name={name} type={type} onChange={handleChange} value={value} required className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600" placeholder={placeholder} />
      {children}
    </div>
  </div>
}
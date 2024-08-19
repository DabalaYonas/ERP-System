export default function SuccessButton({ type, onClick, disabled, children}) {
    return <button 
    type={type}
    onClick={!disabled ? onClick : null} 
    style={{
      cursor: disabled ? "not-allowed" : "pointer",
      border: disabled && "#d9d9d9",
      color: disabled && "rgba(0, 0, 0, 0.25)",
      background: disabled && "rgba(0, 0, 0, 0.04)",
      boxShadow: disabled && "none",
      transition: "all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
    }}
    className="w-full whitespace-nowrap text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-200 font-normal rounded-md text-sm px-4 py-1 text-center dark:bg-dark-600 dark:hover:bg-green-500 dark:focus:ring-green-600">
      {children}
    </button>
}
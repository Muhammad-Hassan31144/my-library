const Input = ({ placeholder, onChange }) => {
  return (

    <div className="relative flex items-center justify-center mt-4">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
        />
        <label
          htmlFor="username"
          className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700"
        >
          Search by Name
        </label>
      </div>
    </div>
  );
};

export default Input;

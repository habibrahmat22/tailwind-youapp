import React, { useState } from 'react';

const InputChip = ({ value, onChange, separator = ',' }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === separator) && input) {
      onChange([...value, input]);
      setInput('');
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, value.length - 1));
    }
  };

  const handleDelete = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2   border-gray-300 rounded">
      {value.map((tag, index) => (
        <div style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)",
          }}key={index} className="flex items-center gap-1 rounded  px-2 py-1 ">
          <span>{tag}</span>
          <button onClick={() => handleDelete(tag)} className="text-white">
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)",
          }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 outline-none rounded"
      />
    </div>
  );
};
export default InputChip
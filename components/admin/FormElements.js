import React, { useId } from "react";

export function TextInput({ label, value, onChange, placeholder, type = "text", required = false, error }) {
  const inputId = useId();
  return (
    <div className="mb-5">
      <label htmlFor={inputId} className="block text-[0.8rem] font-bold text-slate-600 mb-2 tracking-wide">
        {label} {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white text-slate-800 placeholder:text-slate-400 ${
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
            : "border-slate-200/80 focus:border-teal-500 focus:ring-teal-500/20 hover:border-slate-300"
        }`}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export function TextArea({ label, value, onChange, placeholder, rows = 4, required = false, error }) {
  const inputId = useId();
  return (
    <div className="mb-5">
      <label htmlFor={inputId} className="block text-[0.8rem] font-bold text-slate-600 mb-2 tracking-wide">
        {label} {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white text-slate-800 placeholder:text-slate-400 resize-y min-h-[100px] ${
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
            : "border-slate-200/80 focus:border-teal-500 focus:ring-teal-500/20 hover:border-slate-300"
        }`}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export function ToggleSwitch({ label, checked, onChange }) {
  const switchId = useId();
  return (
    <div className="flex items-center justify-between mb-5 py-2">
      <label htmlFor={switchId} className="text-sm font-semibold text-slate-700 cursor-pointer">
        {label}
      </label>
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:ring-offset-1 shadow-inner ${
          checked ? 'bg-teal-500' : 'bg-slate-200'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm border border-black/5 ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

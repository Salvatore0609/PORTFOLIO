import React, { useState } from 'react';
import { languages } from '../i18n/ui';

const LanguageToggle: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = async (lang: string) => {
    const formData = new FormData();
    formData.append('language', lang);
    formData.append('path', window.location.pathname);

    await fetch('/api/set-language', {
      method: 'POST',
      body: formData,
    });

    window.location.reload(); // Ricarica la pagina per applicare la nuova lingua
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <span>{languages[currentLang as keyof typeof languages]}</span>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75605 9.60753 8.75605 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75605 5.10753 8.75605 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.26618 11.9026 7.38064 11.95 7.49999 11.95C7.61933 11.95 7.73379 11.9026 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md border bg-background shadow-lg">
          <div className="py-1">
            {Object.entries(languages).map(([code, name]) => (
              <button
                key={code}
                onClick={() => switchLanguage(code)}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground ${
                  currentLang === code ? 'font-bold' : ''
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
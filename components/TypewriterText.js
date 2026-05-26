import React, { useState, useEffect } from "react";

export default function TypewriterText({ text, className = "", delay = 0 }) {
  const [mounted, setMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setMounted(true);
    
    // Wait for the delay before starting typing
    const delayTimer = setTimeout(() => {
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        
        if (currentIndex >= text.length) {
          clearInterval(typingInterval);
        }
      }, 150);

      return () => clearInterval(typingInterval);
    }, delay * 1000);

    return () => clearTimeout(delayTimer);
  }, [text, delay]);

  // SSR Fallback
  if (!mounted) {
    return (
      <span className={className} style={{ display: "inline-block" }}>
        {text}
      </span>
    );
  }

  return (
    <span className={className} style={{ display: "inline-block" }}>
      {displayedText}
    </span>
  );
}

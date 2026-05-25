import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TypewriterText({ text, className = "", delay = 0 }) {
  const [mounted, setMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

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
          setTypingComplete(true);
          
          // Show blinking cursor for 1.5s after typing finishes
          setTimeout(() => {
            setShowCursor(false);
          }, 1500);
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
      <AnimatePresence>
        {showCursor && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                repeat: Infinity,
                duration: 0.5,
                ease: "linear",
              },
              exit: {
                duration: 0.5,
              }
            }}
            style={{ 
              display: "inline-block", 
              marginLeft: "2px",
              color: "inherit"
            }}
          >
            |
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

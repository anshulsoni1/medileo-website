import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hoverState, setHoverState] = useState("default"); // 'default' | 'interactive' | 'text'
  const [isDarkSection, setIsDarkSection] = useState(true); // default to true (Hero is dark)
  const [isVisible, setIsVisible] = useState(false);
  
  const hoverStateRef = useRef(hoverState);

  useEffect(() => {
    hoverStateRef.current = hoverState;
  }, [hoverState]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rotation = useMotionValue(0);

  // Physics tuned for enterprise precision and subtle elegance
  const springConfigDot = { damping: 28, stiffness: 400, mass: 0.15 }; 
  const springConfigRing = { damping: 35, stiffness: 220, mass: 0.8 };
  const springConfigSecRing = { damping: 40, stiffness: 150, mass: 1.2 };
  const springConfigTrail = { damping: 30, stiffness: 100, mass: 1.5 };
  const springConfigAura = { damping: 40, stiffness: 80, mass: 2 };

  const dotX = useSpring(cursorX, springConfigDot);
  const dotY = useSpring(cursorY, springConfigDot);

  const ringX = useSpring(cursorX, springConfigRing);
  const ringY = useSpring(cursorY, springConfigRing);

  const secRingX = useSpring(cursorX, springConfigSecRing);
  const secRingY = useSpring(cursorY, springConfigSecRing);
  
  const trailX = useSpring(cursorX, springConfigTrail);
  const trailY = useSpring(cursorY, springConfigTrail);

  const auraX = useSpring(cursorX, springConfigAura);
  const auraY = useSpring(cursorY, springConfigAura);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const mouseMoveHandler = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const mouseLeaveHandler = () => setIsVisible(false);
    const mouseEnterHandler = () => setIsVisible(true);

    const handleInteractiveEnter = (e) => {
      e.stopPropagation();
      setHoverState("interactive");
    };
    const handleTextEnter = (e) => {
      e.stopPropagation();
      if (hoverStateRef.current !== "interactive") {
        setHoverState("text");
      }
    };
    const handleHoverEnd = () => setHoverState("default");
    
    const handleDarkEnter = () => setIsDarkSection(true);
    const handleDarkLeave = () => setIsDarkSection(false);

    const addHoverEvents = () => {
      // Interactive elements
      const interactables = document.querySelectorAll("a, button, input, select, textarea, [role='button']");
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleInteractiveEnter);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleInteractiveEnter);
        el.addEventListener("mouseleave", handleHoverEnd);
      });

      // Text elements
      const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, span");
      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleTextEnter);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleTextEnter);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
      
      // Dark Background Sections for Smart Glow
      const darkSections = document.querySelectorAll(".hero-gradient, [class*='bg-[#00152b]'], [class*='bg-[#0b192c]'], footer");
      darkSections.forEach((el) => {
        el.removeEventListener("mouseenter", handleDarkEnter);
        el.removeEventListener("mouseleave", handleDarkLeave);
        el.addEventListener("mouseenter", handleDarkEnter);
        el.addEventListener("mouseleave", handleDarkLeave);
      });
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    document.body.addEventListener("mouseleave", mouseLeaveHandler);
    document.body.addEventListener("mouseenter", mouseEnterHandler);

    addHoverEvents();
    const observer = new MutationObserver(() => addHoverEvents());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      document.body.removeEventListener("mouseleave", mouseLeaveHandler);
      document.body.removeEventListener("mouseenter", mouseEnterHandler);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  // Subtle orbital rotation logic
  useEffect(() => {
    let animationFrameId;
    const rotate = () => {
      if (hoverStateRef.current === "interactive") {
        rotation.set(rotation.get() + 0.8); // Slower, calmer rotation for Phase 3
      }
      animationFrameId = requestAnimationFrame(rotate);
    };
    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [rotation]);

  if (isTouchDevice) return null;

  const isInteractive = hoverState === "interactive";
  const isText = hoverState === "text";

  // Phase 3: Dynamic values based on light/dark backgrounds to ensure visibility without overpowering
  const ringOpacity = isVisible ? (isInteractive ? (isDarkSection ? 0.95 : 0.8) : isText ? 0.15 : (isDarkSection ? 0.5 : 0.3)) : 0;
  const coreShadow = isText 
    ? "0 0 4px rgba(20,184,166,0.3)" 
    : (isDarkSection ? "0 0 12px rgba(20,184,166,0.9)" : "0 0 6px rgba(20,184,166,0.6)");
  const auraOpacity = isVisible && !isText ? (isDarkSection ? 0.12 : 0.04) : 0;

  return (
    <>
      {/* Subtle Atmospheric Aura */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 rounded-full bg-[#14b8a6] blur-xl pointer-events-none z-[9997] mix-blend-screen transition-opacity duration-700"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: auraOpacity,
        }}
      />

      {/* Optional Micro Trail (Delayed cinematic echo) */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-[#14b8a6]/40 pointer-events-none z-[9998] mix-blend-screen transition-opacity duration-500"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && !isText ? (isDarkSection ? 0.3 : 0.15) : 0,
        }}
        animate={{
          scale: isInteractive ? 0 : 1, // Hides during interactive state to prevent clutter
        }}
      />

      {/* Secondary Orbital Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-[#14b8a6]/20 pointer-events-none z-[9998] mix-blend-screen transition-opacity duration-500"
        style={{
          x: secRingX,
          y: secRingY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && isInteractive ? (isDarkSection ? 0.5 : 0.3) : 0,
        }}
        animate={{
          scale: isInteractive ? 1.15 : 0.8,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Primary Outer Orbital Ring */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] mix-blend-screen transition-opacity duration-300 ${isInteractive ? 'border-[#14b8a6]/30 border-t-[#14b8a6]/90 border-r-[#14b8a6]/80' : 'border-[#14b8a6]/40'}`}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotation,
          opacity: ringOpacity,
        }}
        animate={{
          scale: isInteractive ? 1.35 : isText ? 0.6 : 1,
          boxShadow: isInteractive 
            ? `0 0 20px rgba(20,184,166,${isDarkSection ? 0.3 : 0.15}), inset 0 0 10px rgba(20,184,166,${isDarkSection ? 0.2 : 0.1})`
            : "0 0 0px rgba(20,184,166,0)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Inner Glowing Core */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#14b8a6] rounded-full pointer-events-none z-[10000] transition-opacity duration-300"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? (isText ? 0.5 : 1) : 0, 
        }}
        animate={{
          scale: isInteractive ? 0.4 : isText ? 0.8 : 1,
          boxShadow: coreShadow,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </>
  );
}

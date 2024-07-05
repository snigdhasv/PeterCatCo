import { useRef, useState, useEffect } from "react";
export function useHover() { 
const ref = useRef(); 
const [isHovered, setIsHovered] = useState(false); 
const enter = () => setIsHovered(true); 
const leave = () => setIsHovered(false); 
useEffect(() => { 
const refCopy = ref; 
refCopy.current.addEventListener("mouseenter", enter); refCopy.current.addEventListener("mouseleave", leave); 
return () => { 
refCopy.current.removeEventListener("mouseenter", enter); refCopy.current.removeEventListener("mouseleave", leave); 
};
 }, []);
 return [ref, isHovered]; 
}
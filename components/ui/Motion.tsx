"use client";
import React from "react";
import { motion } from "framer-motion";

export const Animate = ({ children, ix, iy, d }: { children: React.ReactNode; ix?: number; iy?: number; ox?: number; oy?: number; d?: number }) => {
	return (
		<motion.div initial={{ opacity: 0, x: ix, y: iy }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: d }}>
			{children}
		</motion.div>
	);
};

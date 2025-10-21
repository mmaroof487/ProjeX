"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
	return (
		<motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
			<Link href="/">
				<Image src="/logo.png" alt="Logo" width={144} height={30} className="w-auto h-auto" />
			</Link>
		</motion.div>
	);
};

export const Label = ({ query }: { query: string }) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
			<p className="text-30-semibold">{query}</p>
		</motion.div>
	);
};

export const Animate = ({ children, ix, iy, d }: { children: React.ReactNode; ix?: number; iy?: number; ox?: number; oy?: number; d?: number }) => {
	return (
		<motion.div initial={{ opacity: 0, x: ix, y: iy }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: d }}>
			{children}
		</motion.div>
	);
};

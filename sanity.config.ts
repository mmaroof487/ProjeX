"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structure } from "sanity/structure"; // ✅ FIXED
import { markdownSchema } from "sanity-plugin-markdown";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	schema,
	plugins: [
		structure(), // ✅ directly call structure()
		visionTool({ defaultApiVersion: apiVersion }),
		markdownSchema(),
	],
});

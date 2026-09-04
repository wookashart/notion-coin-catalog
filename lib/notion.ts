import { Client } from "@notionhq/client";

if (!process.env.NOTION_TOKEN) {
  throw new Error("No NOTION_TOKEN in .env.local");
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error("No NOTION_DATABASE_ID in .env.local");
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export interface Coin {
  id: string;
  name: string;
  country: string | null;
  year: number | null;
  currency: string | null;
  value: number | null;
  type: string | null;
  stamp: string | null;
  alloy: string[];
  circulation: number | null;
  diameter: number | null;
  condition: string | null;
  status: string | null;
  dateInCollection: string | null;
  cluster: number | null;
  page: number | null;
  position: number | null;
  notes: string;
  images: string[];
}

function formatToUuid(id: string): string {
  const clean = id.replace(/[^a-fA-F0-9]/g, "");
  if (clean.length !== 32) return id;
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`;
}

export async function getCoins(): Promise<Coin[]> {
  const token = process.env.NOTION_TOKEN?.trim().replace(/[\r\n]/g, "");
  const rawId = process.env.NOTION_DATABASE_ID || "";
  const dataSourceId = formatToUuid(rawId);

  if (!token || !dataSourceId) {
    console.error("No NOTION_TOKEN or NOTION_DATABASE_ID in .env.local");
    return [];
  }

  try {
    const url = `https://api.notion.com/v1/data_sources/${dataSourceId}/query`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2025-09-03",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      cache: "no-store",
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error(`Notion API error (${res.status}):`, responseText);
      return [];
    }

    const data = JSON.parse(responseText);

    return data.results.map((page: any): Coin => {
      const p = page.properties;

      return {
        id: p.ID?.formula?.string ?? "",
        name: p["Moneta"]?.title?.[0]?.plain_text ?? "",
        country: p["Kraj"]?.select?.name ?? null,
        year: p["Rok emisji"]?.number ?? null,
        value: p["Nominał"]?.number ?? null,
        currency: p["Waluta"]?.select?.name ?? null,
        type: p["Typ monety"]?.select?.name ?? null,
        stamp: p["Stempel"]?.select?.name ?? null,
        alloy: p["Stop / Metal"]?.multi_select.map((item: any) => item.name) ?? [],
        circulation: p["Nakład"]?.number ?? null,
        diameter: p["Średnica [mm]"]?.number ?? null,
        condition: p["Stan zachowania"]?.select?.name ?? null,
        status: p["Status kolekcji"]?.select?.name ?? null,
        dateInCollection: p["W kolekcji od"]?.date?.start ?? null,
        cluster: p["Klaser"]?.number ?? null,
        page: p["Strona"]?.number ?? null,
        position: p["Pozycja"]?.number ?? null,
        notes: p["Uwagi"]?.rich_text?.[0]?.plain_text ?? "",
        images: p["Zdjęcia"]?.files?.map((item: any) => item.file.url) ?? [],
      };
    });
  } catch (error) {
    console.error("Error fetching coins from Notion:", error);
    return [];
  }
}

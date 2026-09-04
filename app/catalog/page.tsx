import { getCoins } from "@/lib/coins";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CatalogPage() {
  const coins = await getCoins();

  console.log("coins:", coins);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Katalog Monet</h1>
        <p className="text-muted-foreground mt-1">
          Pobrano łącznie {coins.length} pozycji z bazy Notion.
        </p>
      </div>

      {coins.length === 0 ? (
        <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
          Brak monet w bazie lub problem z połączeniem z API Notion. Sprawdź token i ID bazy.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coins.map((coin) => (
            <Card key={coin.id} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="truncate text-base font-semibold">{coin.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

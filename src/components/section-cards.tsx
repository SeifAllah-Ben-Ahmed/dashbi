import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/utils/fotmatNumber";

interface SectionCardsData {
  card_back_order?: { com: string; backorder_amnt: number }[];
  card_recieved_ninvoiced?: { com: string; received_not_invoiced: number }[];
  card_total_spent?: { com: string; total_spent: string }[];
  card_full_delivery?: { com: string; otd_fournisseur: string }[];
  card_on_time_delivery?: { com: string; otd_fournisseur: string }[];
}

export function SectionCards({ data }: { data: SectionCardsData }) {
  const cardList = Object.keys(data) as Array<keyof SectionCardsData>;
  return (
    <Card className="self-start gap-2">
      <CardHeader className="flex items-center justify-center text-center w-full gap-2">
        <CardTitle>SPENDING STATS</CardTitle>
      </CardHeader>
      {cardList.map((key) => {
        const display = data[key][0];
        const keys = Object.keys(display) as Array<keyof typeof display>;
        return (
          <CardHeader
            key={key}
            className="flex items-center justify-center text-center w-full gap-2"
          >
            <CardDescription>{display[keys[0]]} :</CardDescription>
            <CardTitle>{formatNumber(Number(display[keys[1]]))} TND</CardTitle>
          </CardHeader>
        );
      })}
    </Card>
  );
}

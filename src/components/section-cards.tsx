import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <>
      {cardList.map((key) => {
        const display = data[key][0];
        const keys = Object.keys(display) as Array<keyof typeof display>;
        return (
          <Card className="self-start" key={key}>
            <CardHeader>
              <CardDescription>{display[keys[0]]}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {display[keys[1]]}
              </CardTitle>
            </CardHeader>
          </Card>
        );
      })}
    </>
  );
}

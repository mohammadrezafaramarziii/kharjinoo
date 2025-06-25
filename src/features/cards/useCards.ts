import { useQuery } from "@tanstack/react-query";
import { getCardsApi } from "../../services/cardsService";
import useUser from "../auth/useUser";
import { accountNumberCommas } from "../../utils/accountNumberCommas";

export default function useCards() {
  const { user } = useUser();
  const { data: cards, isLoading } = useQuery({
    queryKey: ["get-cards"],
    queryFn: () => getCardsApi({ userId: user.id }),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const transformCards: { value: string; label: string }[] = (cards ?? [])?.map(
    (card) => {
      const reversedFormatted = accountNumberCommas(Number(card.bankNumber));
      const correctFormatted = reversedFormatted
        .split("\u2000")
        .reverse()
        .join("\u2000");

      return {
        value: card.id,
        label: ` ${card.isDefault ? "(پیش فرض)" : ""} ${
          card.name
        } - ${correctFormatted}`,
      };
    }
  );

  return { cards, transformCards, isLoading };
}

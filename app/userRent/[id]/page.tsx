import { ApiPropertyDetailPage } from "@/components/property/ApiPropertyDetailPage";

export default function UserRentDetailPage() {
  return (
    <ApiPropertyDetailPage
      backLink="/userRent"
      notFoundLabel="Property not found"
    />
  );
}

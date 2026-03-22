import { getCategories } from "@/data/loaders";
import CategoryButton from "@/components/custom/category-button";

export async function CategorySelect({ locale }: { locale: string }) {
  const data = await getCategories(locale);
  if (!data) return null;

  return (
    <div className="w-full flex gap-2 justify-center items-center flex-wrap">
      <CategoryButton value="">
        {locale === "ar" ? "الكل" : "All"}
      </CategoryButton>
      {data.data.map((category) => (
        <CategoryButton key={category.documentId} value={category.text}>
          {category.text}
        </CategoryButton>
      ))}
    </div>
  );
}

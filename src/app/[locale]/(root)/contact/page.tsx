import ContactSection from "@/components/block-renderer/blocks/contact";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Deciphi for expert cybersecurity solutions and services tailored to your business needs.",
};

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  return (
    <main>
      <ContactSection locale={locale} />
    </main>
  );
}

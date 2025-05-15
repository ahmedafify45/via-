import "./[locale]/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { serverFetcher } from "@/lib/serverFetcher";
import { Metadata } from "next";

interface GeneralSettings {
  data: {
    favicon: {
      data: {
        full_url: string;
      };
    };
  }[];
  public: boolean;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await serverFetcher<GeneralSettings>(
      "/items/general_settings",
      {
        fields: "favicon.*",
      }
    );

    const faviconUrl = settings.data[0]?.favicon?.data?.full_url;

    return {
      icons: {
        icon: faviconUrl || "/favicon.ico", // Fallback to default favicon if none set
      },
    };
  } catch (error) {
    console.error("Error fetching favicon:", error);
    return {
      icons: {
        icon: "/favicon.ico",
      },
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" expand={false} />
      </body>
    </html>
  );
}

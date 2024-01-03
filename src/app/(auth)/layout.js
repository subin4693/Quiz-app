import "../(root)/globals.css";
import { NextAuthProvider } from "@/providers/Providers";

export const metadata = {
    title: "Quiz app login",
    description: "Quiz app login page",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg_radial-gradient w-screen h-screen">
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    );
}

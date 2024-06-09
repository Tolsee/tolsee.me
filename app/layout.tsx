import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head />
            <body className="mx-auto">
                {children}
            </body>
        </html>
    )
}

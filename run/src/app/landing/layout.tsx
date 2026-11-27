import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'landing page — MedQ',
    description: 'a marketing surface that explains the app to new visitors and drives them to sign up / launch the app.',
};

export default function landingPageLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <>
            {children}
            {modal}

        </>
    )
}

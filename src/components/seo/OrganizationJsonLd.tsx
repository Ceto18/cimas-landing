export function OrganizationJsonLd() {
    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ??
        "http://localhost:3000";

    const jsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "Organization",

        name:
            "CIMA’S & INGENIEROS E.I.R.L.",

        url:
            siteUrl,

        logo:
            `${siteUrl}/logo.png`,

        description:
            "Empresa peruana dedicada a la ingeniería, construcción, supervisión y consultoría.",

        address: {
            "@type":
                "PostalAddress",

            addressLocality:
                "Huaraz",

            addressRegion:
                "Áncash",

            addressCountry:
                "PE",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html:
                    JSON.stringify(
                        jsonLd
                    ).replace(
                        /</g,
                        "\\u003c"
                    ),
            }}
        />
    );
}
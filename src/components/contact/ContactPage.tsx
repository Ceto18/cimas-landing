import { Navbar } from "@/components/layout/Navbar";

import type { SocialNetworkProfile } from "@/types/social-network.types";
import type { ProjectType } from "@/types/project.types";

import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

interface ContactPageProps {
    socialNetworks: SocialNetworkProfile[];
    projectTypes: ProjectType[];
}

export function ContactPage({
    socialNetworks,
    projectTypes,
}: ContactPageProps) {
    return (
        <main className="min-h-screen bg-[#f5f7fa]">
            {/* HERO */}
            <section className="relative overflow-hidden bg-[#0b294b] text-white">
                <Navbar />

                {/* fondo decorativo */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-[#5da5dc]/30 blur-3xl" />
                    <div className="absolute bottom-[-100px] right-[-80px] h-80 w-80 rounded-full bg-[#e08a3c]/20 blur-3xl" />
                </div>

                <div className="container relative pb-24 pt-44 md:pb-28 md:pt-52">
                    <div className="max-w-3xl">
                        <p className="eyebrow light">
                            <span />
                            Conversemos
                        </p>

                        <h1 className="mt-6 max-w-3xl text-5xl font-normal leading-[1.02] tracking-[-0.045em] text-white md:text-7xl">
                            Construyamos algo
                            <br />
                            <strong className="font-normal text-[#5da5dc]">
                                juntos.
                            </strong>
                        </h1>

                        <p className="mt-8 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                            Comparte los detalles de tu proyecto con nuestro equipo y nos
                            pondremos en contacto contigo para ayudarte a encontrar la mejor
                            solución.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTENIDO */}
            <section className="relative py-16 md:py-24">
                <div className="container">
                    <div className="mb-14 max-w-3xl">
                        <p className="eyebrow">
                            <span />
                            Solicitud de información
                        </p>

                        <h2 className="mt-5 text-4xl font-normal tracking-[-0.04em] text-[#0d2948] md:text-5xl">
                            Un equipo cerca de tu
                            <br />
                            próximo desafío.
                        </h2>

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#617084] md:text-base">
                            Ya sea para una obra, supervisión, consultoría o adquisición de
                            materiales, estamos listos para escuchar tu necesidad y orientarte
                            desde el primer momento.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] xl:gap-12">
                        <ContactInfo socialNetworks={socialNetworks} />
                        <ContactForm projectTypes={projectTypes} />
                    </div>
                </div>
            </section>
        </main>
    );
}
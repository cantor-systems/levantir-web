import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function Home() {
  return (
    <main>
      <Section className="min-h-screen bg-[var(--surface-warm)]">
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-10">
            <Image
              src="/brand/levantir-logo-reference.png"
              alt="LEVANTIR"
              width={975}
              height={400}
              priority
              className="h-auto w-[220px] sm:w-[280px]"
            />

            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[var(--levantir-blue)]">
                SEGUROS · GESTIÓN DE RIESGOS · PROTECCIÓN PATRIMONIAL
              </p>
              <h1 className="font-display text-4xl leading-[1.05] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                Protegemos lo que has construido.
              </h1>
              <p className="mt-6 max-w-[55ch] text-base leading-7 text-[var(--text-body)]">
                Base técnica de LEVANTIR lista para construir una experiencia
                institucional, editorial y orientada a asesoría.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

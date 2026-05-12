import FormCliente from "../components/FormCliente";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Cadastro de Clintes
          </h1>
          <p className="mt-2 text-slate-600">
            Projeto introdutório com React, Next.js e Tailwind CSS.
          </p>
        </div>

        <FormCliente />
      </section>
    </main>
  )
}
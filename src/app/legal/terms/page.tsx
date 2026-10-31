import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-secky-blue-600 hover:underline mb-8">
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-secky-blue-900 mb-4">Conditions d'utilisation</h1>
        <p className="text-sm text-neutral-500 font-medium mb-12">Dernière mise à jour : 26 Octobre 2026</p>

        <div className="prose prose-slate max-w-none text-neutral-600 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">1. Objet</h2>
            <p>Les présentes conditions générales d'utilisation (CGU) ont pour objet l'encadrement juridique de l'utilisation de la plateforme SeckyPay, éditée par Secky Tech SARL, dont le siège social est situé à Ouagadougou, Burkina Faso.</p>
            <p>SeckyPay est un service d'intermédiation technique permettant aux entreprises d'encaisser des paiements mobiles via les opérateurs Orange Money, Moov Money et Wave.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">2. Accès au service</h2>
            <p>L'accès à la plateforme est réservé aux professionnels ayant créé un compte et dont le dossier a été validé par l'équipe Secky Tech. L'utilisateur s'engage à fournir des informations exactes et à maintenir la confidentialité de ses identifiants.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">3. Responsabilité</h2>
            <p>SeckyPay agit en tant qu'intermédiaire technique. Nous ne conservons pas les fonds des marchands. Les transactions sont directement traitées par les opérateurs de téléphonie mobile. Secky Tech ne saurait être tenu responsable des indisponibilités des réseaux des opérateurs.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">4. Tarification</h2>
            <p>L'utilisation de SeckyPay est soumise aux tarifs en vigueur, consultables sur la page Tarifs de notre site. Les frais de transaction des opérateurs sont prélevés directement par ces derniers.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">5. Droit applicable</h2>
            <p>Les présentes CGU sont soumises au droit burkinabè. Tout litige sera porté devant les tribunaux compétents de Ouagadougou.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
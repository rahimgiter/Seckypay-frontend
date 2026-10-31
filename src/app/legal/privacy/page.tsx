import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-secky-blue-600 hover:underline mb-8">
          <ArrowLeft size={16} /> Retour à l'accueil
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-secky-blue-900 mb-4">Politique de confidentialité</h1>
        <p className="text-sm text-neutral-500 font-medium mb-12">Dernière mise à jour : 26 Octobre 2026</p>

        <div className="prose prose-slate max-w-none text-neutral-600 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">1. Collecte des données</h2>
            <p>Nous collectons les données que vous nous fournissez lors de la création de votre compte (nom, email, téléphone, informations sur l'entreprise) ainsi que les données relatives à vos transactions (montants, numéros de téléphone des payeurs).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">2. Utilisation des données</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Fournir le service d'encaissement et générer les reçus.</li>
              <li>Assurer la sécurité de votre compte (vérification OTP).</li>
              <li>Respecter nos obligations légales et comptables (SYSCOHADA).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">3. Partage des données</h2>
            <p>Vos données ne sont jamais vendues à des tiers. Elles sont partagées uniquement avec les opérateurs de paiement (Orange, Moov, Wave) dans le cadre strict de l'exécution des transactions, et avec nos prestataires techniques (hébergement, envoi de SMS).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">4. Sécurité</h2>
            <p>Nous mettons en œuvre des mesures de sécurité de niveau bancaire : chiffrement des communications, masquage des numéros de téléphone, et vérification en deux étapes pour les administrateurs.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-secky-blue-900 mb-3">5. Vos droits</h2>
            <p>Conformément aux réglementations en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à <strong>dpo@seckytech.com</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}